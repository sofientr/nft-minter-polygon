import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link'

import {
  Brightness4Outlined as ToggleDarkModeIcon,
  Brightness5Outlined as ToggleLightModeIcon,
} from "@material-ui/icons/";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import dynamic from "next/dynamic";
const ConnectWallet = dynamic(() => import("./ConnectWallet"), {
  ssr: false,
});

const Navbar = ({ toggleMode, darkMode, signerAddress, contract_1155, contract_721, setContract_1155, setContract_721, setSignerAddress, setNetworkId }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>

        <Typography variant="h6" className={classes.title}>
          <Link href="/">
            <a>Main page</a>
          </Link>
        </Typography>

        <Typography variant="h6" className={classes.title}>
          <Link href="/Mint">
            <a>Mint</a>
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link href="/ExternelMint">
            <a>Externel Mint</a>
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link href="/logout">
            <a>Logout </a>
          </Link>
        </Typography>
        <ConnectWallet
          signerAddress={signerAddress}
          contract_1155={contract_1155}
          contract_721={contract_721}
          setContract_1155={setContract_1155}
          setContract_721={setContract_721}
          setSignerAddress={setSignerAddress}
          setNetworkId={setNetworkId}
        />

      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 1100,
    boxShadow: 'none'
  },
  img: {
    width: 150,
    marginRight: 20
  },
  title: {
    flexGrow: 1,
    // color: '#784ffe',
    [theme.breakpoints.down('xs')]: {
      fontSize: 0,
      // display: 'none'
    },
  },
  toggleBtn: {
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginRight: 5,
    },
  }
}));

export default Navbar;