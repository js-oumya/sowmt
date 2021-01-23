import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {getData, ServerURL ,postData,postDataAndImage1}  from '../FetchNodeServices'
import { checkRequire,checkEmail,checkPassword } from '../Checks';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://.com/"> */}
        Soumya Jain
      {/* </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function UserRegistration(props) {
  const classes = useStyles();
  const [name,setName]=useState('');
  const [emailId,setEmailId]=useState('');
  const [password,setPassword]=useState('');
  const [getErrorName,setErrorName]=useState('');
  const [getErrorEmailId,setErrorEmailId]=useState('');
  const [getErrorPassword,setErrorPassword]=useState('');
  const [getMsg, setMsg] = useState('');
 
  const handleSubmit=async()=>{
    var err=false;
    if(!checkRequire(name))
    {err=true
    setErrorName('/images/cross.png') }
    if(checkRequire(name))
    {
    setErrorName('/images/tick.png') }

    if(!checkEmail(emailId))
    {err=true
     setErrorEmailId('/images/cross.png')
    }
    if(checkEmail(emailId))
    {setErrorEmailId('/images/tick.png')}

    if(!checkPassword(password))
    {err=true
     setErrorPassword('/images/cross.png')
    }
    if(checkPassword(password))
    {setErrorPassword('/images/tick.png')}
    if(!err){
        const formData = new FormData()
        formData.append('name',name)
        formData.append('emailid',emailId)
        formData.append('password',password)
      
       const config = {headers:{'content-type':'multipart/form-data'}}
       let result = await postDataAndImage1('signin/addnewrecord',formData,config)
        console.log("SSS",result)
      if(result)
      {setMsg("User Registered...")}
      else
      {setMsg("Failed to Register User...")}
    }
  }
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUser />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Registration
        </Typography>
        <img src={getErrorName} width='10' height='10'/>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            // name="email"
            autoComplete="name"
            autoFocus
            onChange={(e)=>setName(e.target.value)}
          />
           <img src={getErrorEmailId} width='10' height='10'/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            // name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setEmailId(e.target.value)}
          />
           <img src={getErrorPassword} width='10' height='10'/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handleSubmit()}
          >
            Sign Up
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        
      </div>
     
      {getMsg}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}