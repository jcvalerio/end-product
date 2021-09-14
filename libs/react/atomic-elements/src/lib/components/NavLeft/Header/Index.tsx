import { HeaderNavLeftProps } from './HeaderNavLeft.model';
import { useStyles } from './HeaderNavLeft.style';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames';
import { Grid, Typography } from '@material-ui/core';

const bem = 'ks-nav-left-header';

export const HeaderNavLeft = ({ accountName, logo, productName }: HeaderNavLeftProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classnames(bem, classes.appBarContainer)}>
      <AppBar className={classnames(`${bem}__app-bar`, classes.appBar)} color="primary" position="fixed">
        <div className={classnames(`${bem}__content`, classes.appBarContent)}>
          {logo ? (
            <div className={classnames(`${bem}__logo`, classes.logoContainer)}>
              <Avatar alt="KS" variant="square" src={logo} />
            </div>
          ) : null}
          <Grid container className={classnames(`${bem}_names-container`, classes.namesContainer)}>
            {accountName && (
              <Grid item xs={12}>
                <Typography className={classnames(`${bem}_account-name`, classes.accountName)}>
                  {accountName}
                </Typography>
              </Grid>
            )}
            {productName && (
              <Grid item xs={12}>
                <Typography className={classnames(`${bem}_product-name`, classes.productName)}>
                  {productName}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      </AppBar>
    </div>
  );
};
