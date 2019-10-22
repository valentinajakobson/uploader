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
    minHeight:'70vh',
    padding:'25px',
    color:'white'
  });

const MyButton = styled(Button)({
    color: 'default',
    
  });


class Uploader extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedFile:null,
            data:null,
            files: [],
        } 
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  componentDidMount(){
    this.updateUploadedList();
    // fetch('http://localhost:3000')
    // .then(res => res.json())
    // .then(data => this.setState({ files: data.files }));
  }
    
    onChangeHandler = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
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

        const { files } = this.state;

        return (
            <div>
                <MyGrid container spacing={5}>
                <MyGrid item xs={6}>
                    <MyPaper>
                    <div className="file-field input-field">
                        <h4>Choose file and press Upload</h4>
                    </div>
                    <form>
                    <input type="file" required name="file_upload" onChange={this.onChangeHandler} /> 
                    <MyButton
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        type="submit" 
                        onClick={this.onChangeHandler}
                        >Upload
                    </MyButton>
                    </form>
                    <ProgressBar percentage={this.state.percentage} />
                  </MyPaper>
                </MyGrid>
                <MyGrid item xs={6}>
                    <MyPaper>
                    <div className="file-field input-field">
                        <h4>Uploaded files</h4>
                    </div>
                    <ul>
                        {files.map(file =>
                           <li key={file.objectID}> 
                           <a href={file.url}>{file.title}</a>
                        </li>
                        )}
                    </ul>

                    </MyPaper>
                </MyGrid>
                </MyGrid>
                </div>
        );
      }
    }
      
    export default Uploader;