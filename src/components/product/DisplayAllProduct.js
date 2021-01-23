import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import {postDataAndImage, getData, postData,ServerURL}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


 
const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:30,
      },
     
    tableDiv:{
       width:window.innerWidth*0.60,
    },
      paperStyle:{
       width:window.innerWidth*0.30,
        padding:20,
        margin:20,
        backgroundColor:'#f1f2f6'
      },
      paperHeading :{
        margin:10,
        padding:10,
        display:'flex',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#dfe4ea'
      },
      subclass:{
        marginTop:3,
        marginBottom:4,
        display:'flex',
        flexDirection:'row'

      },
      avatortheme:{
        width: 60,
        height: 60,
      },
    input:
     {
      display: 'none',

    },
    button: {
      margin: theme.spacing(1),
       width:220,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  }));

  
export default function DisplayAllProduct(props){
    const classes=useStyles()
    const [getProductName,setProductName]=useState('')
    const [getPrice,setPrice]=useState('')
    const [getProductId,setProductId]=useState('')
    const [getCategory,setCategory]=useState('')
  
    const [getPicture,setPicture]=useState({pic:'',filePic:''})
   
    const [getStock,setStock]=useState('')
    const [getMsg,setMsg]=useState('')
   
    const [getErrProductName,setErrProductName]=useState('')
    
    const [getErrPrice,setErrPrice]=useState('')
   
    const [getErrCategory,setErrCategory]=useState('')
   
    const [getErrPicture,setErrPicture]=useState('')
   
    const [getErrStock,setErrStock]=useState('')
    const [getList,setList]=useState([])
    const [getOpen,setOpen]=useState(false)
    const [state, setState] = useState({
        columns: [
          { title: 'Product Id', field: 'productid' },
          { title: 'Product Name', field: 'name' },
          { title: 'Price', field: 'price' },
          { title: 'Category', field: 'category' },
          { title: 'Quantity', field: 'qty' },
          { title: 'Product Picture',   field: 'image' ,
       render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.image}`} className={classes.avatortheme}/></div> },
          ],  
      });
         

    const fetchData=async()=>{
    var list=await getData("product/displayall")
    setList(list)

    }

      useEffect(function(){
          fetchData()
         
      },[])
      const handleDelete=async(oldData)=>{
        var body={productid:oldData.productid}
         var result=await postData('product/deleteRecord',body)
       }
       const handleClickOpen=(rowData)=>{
        
        setOpen(true)
        setProductId(rowData.productid)
        setProductName(rowData.name)
        setPrice(rowData.price)
        
        setCategory(rowData.category)
       
        setStock(rowData.qty)
        setPicture({pic:'',filePic:`${ServerURL}/images/${rowData.image}`})

    }

    const handleClose=()=>{
        setOpen(false)
        setProductName('')
       
        setPrice('')
        
        setCategory('')
        setStock('')
        setPicture({pic:'',filePic:''})
       
        setMsg('')
        setErrProductName('')
       
        setErrPrice('')
       
        setErrCategory('')
       
        setErrStock('')
        setErrPicture('')
       fetchData()
       
    }
    const handleDialog=()=>{
        return (
            <div>
        <Dialog  open={getOpen} onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description" >
       
         
           <div className={classes.root}>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
 {/* <img src='/images/product.png' alt="Product"  width='60' height='50' /> */}
    <Typography variant="h6" gutterBottom>
        &nbsp;Edit Products
      </Typography>
     </Paper>
     <Grid container spacing={1}>
     <Grid item xs={12} className={classes.subclass}>
         {/* <img src='/images/tick.png' width='10' height='10' /> */}
         <TextField fullWidth label='Product Id' value={getProductId} variant='standard'  /> 
         </Grid>
        <Grid item xs={12} className={classes.subclass}>
        
      <img src={getErrProductName} width='10' height='10' />
      <TextField fullWidth label="Product Name" value={getProductName} variant="standard" onChange={(event)=>setProductName(event.target.value)}/>
        </Grid>  
      
        <Grid item xs={12} className={classes.subclass}>
      <img src={getErrPrice} width='10' height='10' />
      <TextField fullWidth label="Price" variant="standard" value={getPrice} onChange={(event)=>setPrice(event.target.value)}/>
        </Grid>  
        <Grid item xs={12} className={classes.subclass}>
      <img src={getErrCategory} width='10' height='10' />
      <TextField fullWidth label="Category" variant="standard" value={getCategory} onChange={(event)=>setCategory(event.target.value)}/>
        </Grid>  
        <Grid item xs={12} className={classes.subclass}>
      <img src={getErrStock} width='10' height='10' />
      <TextField fullWidth label="Quantity" variant="standard" value={getStock} onChange={(event)=>setStock(event.target.value)}/>
        </Grid> 

      
        <Grid item xs={6} className={classes.center}>
         <img src={getErrPicture} width='10' height='10' />
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filepic"
        multiple
        type="file"
        onChange={(event)=>setPicture({pic:event.target.files[0],filePic:URL.createObjectURL(event.target.files[0])})}
      />
      <label htmlFor="contained-button-filepic">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Picture
        </Button>
      </label>
         </Grid>
       <Grid item xs={6} className={classes.center} >
         <Avatar alt="Remy Sharp" variant='rounded' src={getPicture.filePic} className={classes.avatortheme}/>
        </Grid>
       
      
    
      
      
        
   
    
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} 
        onClick={()=>handleEdit()}
        >
          Edit
         </Button>
        </Grid>
       
        <Grid item xs={12} className={classes.subclass}>
          <div>
            <b>Message : {getMsg}</b> 
          </div>
        </Grid></Grid>
        <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
     </Paper>
 </div>
 </Dialog>
           </div>
)
    }
     
  
    const handleEdit=async()=>{
    var err=false
    if(!checkRequire(getProductName))
    { err=true
      setErrProductName('/images/cross.png') }
    if(checkRequire(getProductName))
    { setErrProductName('/images/tick.png')}
     
  

    if(!checkRequire(getPrice))
    { err=true
      setErrPrice('/images/cross.png') }
    if(checkRequire(getPrice))
    { setErrPrice('/images/tick.png')}
    
    if(!checkRequire(getCategory))
    { err=true
      setErrCategory('/images/cross.png') }
    if(checkRequire(getCategory))
    { setErrCategory('/images/tick.png')}


   

    if(!checkRequire(getStock))
    { err=true
      setErrStock('/images/cross.png') }
    if(checkRequire(getStock))
    { setErrStock('/images/tick.png')}

  

    if(!checkRequire(getPicture.filePic))
    { err=true
      setErrPicture('/images/cross.png') }
    if(checkRequire(getPicture.filePic))
    { setErrPicture('/images/tick.png')}

   
   

   

   
if(!err){
  var formData=new FormData
  
  formData.append('name',getProductName)
  
  formData.append('price',getPrice)
  formData.append('category',getCategory)
  formData.append('qty',getStock)
  
 
  formData.append('picture',getPicture.pic)
  formData.append('productid',getProductId)
  var config={headers:{'content-type':'multipart/form-data'}}
   var result=await postDataAndImage('product/updateproduct',formData,config)
   console.log(result)
   if(result){
    setMsg("Record Updated..")
    }
   else{
    setMsg("Failed To Update Record..")
   } 
}
else{
    setMsg("Error in Input...")
}
}

const ClearData=()=>{
    setProductName('')
    setPrice('')
   
    setCategory('')
   
    setStock('')
    setPicture({pic:'',filePic:''})
   
    setMsg('')
    setErrProductName('')
  
    setErrPrice('')
    
    setErrCategory('')
    
    setErrStock('')
    setErrPicture('')
    
  }

return(
    <div className={classes.root}>
        <div className={classes.tableDiv} >
       <MaterialTable style={{backgroundColor:'#ecf0f1'}}
         title="Product List"
         columns={state.columns}
         data={getList}
         actions={[
           {
             icon: 'edit',
             tooltip: 'Edit',
             onClick: (event, rowData) => handleClickOpen(rowData)
           }
         ]}
         editable={{
           onRowDelete: (oldData) =>
             new Promise((resolve) => {
               setTimeout(() => {
                 resolve();
                 const data = [...getList]
                   data.splice(data.indexOf(oldData), 1);
                   //console.log(data)
                   //console.log(getList)
                   setList(data)
                   handleDelete(oldData)
               }, 600);
             }),
         }}
       />
       {handleDialog()}
       </div>
       </div>
     
  
)
}



