import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";

import { getCustomers, getCustomerProducts } from "../store/action";
import OrderedProducts from "./OrderedProducts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Customers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const customers = useSelector((state) => state.customers);
  const customerProducts = useSelector((state) => state.customerProducts);

  const [value, setValue] = useState(0);
  const [localCustomers, setLocalCustomers] = useState([]);
  const [localCustomerProducts, setLocalCustomerProducts] = useState(null);
  const [customerProductKeys, setCustomerProductKeys] = useState([]);

  useEffect(() => {
    if (customers.length > 0) {
      setLocalCustomers(customers);
      setValue(customers[0].id);
      dispatch(getCustomerProducts(customers[0].id));
    }
  }, [customers]);

  useEffect(() => {
    if (customerProducts) {
      setLocalCustomerProducts(customerProducts);
      setCustomerProductKeys(Object.keys(customerProducts));
    }
  }, [customerProducts]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(getCustomerProducts(newValue));
  };

  // console.log(localCustomerProducts, customerProductKeys);

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        All Customers and Ordered Products
      </Typography>
      <div className={classes.root}>
        {localCustomers && (
          <Fragment>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              {localCustomers.map((each) => {
                return (
                  <Tab
                    key={each.id}
                    value={each.id}
                    label={each.name}
                    {...a11yProps(each.id)}
                  />
                );
              })}
            </Tabs>
            {localCustomers.map((each) => {
              return (
                <TabPanel
                  key={each.id}
                  value={value}
                  index={each.id}
                  style={{ width: "100%" }}
                >
                  {customerProductKeys.length > 0 ? (
                    <OrderedProducts
                      products={localCustomerProducts}
                      productKeys={customerProductKeys}
                    />
                  ) : (
                    <Alert severity="info">There is no ordered product!</Alert>
                  )}
                </TabPanel>
              );
            })}
          </Fragment>
        )}
      </div>
    </div>
  );
}
