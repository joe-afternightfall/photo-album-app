import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import RequestAccessForm from './components/RequestAccessForm';
import SignInForm from './components/SignInForm';
import TabPanel from './components/TabPanel';

export default function SignInScreen(): JSX.Element {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  // const createAccount = async () => {
  //   try {
  //     if (emailRef.current && passwordRef.current) {
  //       await auth.createUserWithEmailAndPassword(
  //         emailRef.current.value,
  //         passwordRef.current.value
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          <Card sx={{ minWidth: isMd ? '400px' : '300px', pb: 8 }} square>
            <CardContent sx={{ px: 0, pt: 0 }}>
              <AppBar position="static">
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                >
                  <Tab label="Sign In" />
                  <Tab label="Request Access" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={currentTab}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={currentTab} index={0} dir={theme.direction}>
                  <SignInForm />
                </TabPanel>
                <TabPanel value={currentTab} index={1} dir={theme.direction}>
                  <RequestAccessForm />
                </TabPanel>
              </SwipeableViews>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
