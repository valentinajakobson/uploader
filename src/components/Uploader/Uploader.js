import React, {Component} from 'react';
import axios from 'axios';
import './Uploader.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


const MyGrid = styled(Grid)({
    root: {
        flexGrow: 1,
      },
    
  });

const MyPaper = styled(Paper)({
    backgroundColor: '#4e4f52',
  });

const MyButton = styled(Button)({
    color: 'default',
    
  });

class Uploader extends Component {
    
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0,
            percentage:0
        })
    }
   
    constructor(props){
        super(props);
        this.state = {
            selectedFile:null
        }
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("/upload", data,{
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        })
            .then(res => {
                console.log(res.statusText)
        })
    }
   
        
    render() {
        return (
                <MyGrid container spacing={5}>
                <MyGrid item xs={6}>
                    <MyPaper>
                    
                    <div className="file-field input-field">
                        <div className="btn">
                            <h4>Choose file and press Upload</h4>
                        </div>
                    </div>
                   
                    <input type="file" required name="file_upload" onChange={this.onChangeHandler} />
                   
                 
            <MyButton
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            type="submit" 
            onClick={this.onClickHandler}
            >
            Upload
            </MyButton>
                    <ProgressBar percentage={this.state.percentage} />
                  
                    </MyPaper>
                </MyGrid>
                <MyGrid item xs={6}>
                    <MyPaper>xs=6</MyPaper>
                </MyGrid>
                </MyGrid>
             
        );
      }
    }
    
 
  
    export default Uploader;