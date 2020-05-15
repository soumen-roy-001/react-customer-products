import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import List from "@material-ui/core/List";

import Button from "@material-ui/core/Button";

import { getProducts, postProducts } from "../store/action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  inline: {
    display: "inline",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const statusList = ["Processing", "Done"];

export default function OrderedProducts({ products, productKeys }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const mainProducts = useSelector((state) => state.products);
  const updatedProduct = useSelector((state) => state.updatedProduct);
  const [formState, setFormState] = useState({
    values: {},
  });

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const currProduct = mainProducts.filter(
      (each) => parseInt(each.id) === parseInt(e.currentTarget.value)
    )[0];
    const data = currProduct;
    const qtyKey = `quantity-${parseInt(e.currentTarget.value)}`;
    const statusKey = `status-${parseInt(e.currentTarget.value)}`;

    if (qtyKey in formState.values) {
      data.quantity = parseInt(formState.values[qtyKey]);
    }
    if (statusKey in formState.values) {
      data.status = formState.values[statusKey];
    }
    if (qtyKey in formState.values || statusKey in formState.values) {
      dispatch(postProducts(data));
    }
  };

  // console.log("updatedProduct", updatedProduct);
  const totalQty = (arr) => {
    const total = arr.reduce(function (acc, obj) {
      return acc + obj.quantity;
    }, 0);
    return total;
  };

  return (
    <div className={classes.root}>
      {productKeys.map((eachKey) => {
        return (
          <ExpansionPanel key={eachKey}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${eachKey}-content`}
              id={`${eachKey}-header`}
            >
              <Typography className={classes.heading}>
                Product #{eachKey} ({products[eachKey][0].name})
              </Typography>

              <Typography className={classes.secondaryHeading}>
                Total Quantity: {totalQty(products[eachKey])}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List dense style={{ width: "100%" }}>
                {products[eachKey].map((eachOrder) => {
                  return (
                    <Grid container key={eachOrder.id} spacing={1}>
                      <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} variant="outlined">
                          Order #{eachOrder.orderId}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} variant="outlined">
                          <TextField
                            label="Quantity"
                            type="number"
                            onChange={handleChange}
                            name={`quantity-${eachOrder.id}`}
                            value={
                              formState.values[`quantity-${eachOrder.id}`]
                                ? formState.values[`quantity-${eachOrder.id}`]
                                : eachOrder.quantity
                            }
                            variant="outlined"
                            size="small"
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper} variant="outlined">
                          <TextField
                            select
                            label="Status"
                            name={`status-${eachOrder.id}`}
                            value={
                              formState.values[`status-${eachOrder.id}`]
                                ? formState.values[`status-${eachOrder.id}`]
                                : eachOrder.status
                            }
                            onChange={handleChange}
                            size="small"
                            variant="outlined"
                          >
                            {statusList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                            ))}
                          </TextField>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          value={eachOrder.id}
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}
