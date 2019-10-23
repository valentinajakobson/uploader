import React, {Component} from 'react';
import axios from 'axios';
import './Uploader.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const MyGrid = styled(Grid)({
    root: {
        flexGrow: 1,
      },
  });

const MyPaper = styled(Paper)({
    backgroundColor: '#4e4f52',
    minHeight:'70vh',
    padding:'25px',
    color:'white',
    margin:'25px',
  });

const MyCloudUploadIcon = styled (CloudUploadIcon) ({
     fontSize: '150px'  
  })

class Uploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile:null,
            data:[],
        }
    }    
    
    componentDidMount (){
        this.updateUploadedFileList();
    }

    onChangeHandler = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        axios.post('/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
            .then(res => {
                this.updateUploadedFileList() 
            })
            this.form.reset();
    }

    updateUploadedFileList = () => {
        axios.get('/fetch')
        .then(res => {
            this.setState({data:res.data})
        })
    }

    render() {
        const {data} = this.state;
        return (
                <MyGrid container spacing={3}>
                <MyGrid item xs={12} sm={6}>
                    <MyPaper>
                        <div className="file-field input-field">
                            <div>
                                <h4>Click icon and choose file to Upload</h4>
                            </div>
                        </div>
                    <form ref={form => this.form = form}>
                        <label htmlFor="uploadFile">
                        <MyCloudUploadIcon /></label>
                        <input type="file" required name="file_upload" id="uploadFile" onChange={this.onChangeHandler} />
                    </form>
                    </MyPaper>
                </MyGrid>
                <MyGrid item xs={12} sm={6}>
                    <MyPaper>
                        <div className="input-field">
                            <h4>Uploaded files</h4>
                        </div>
                        <div>
                            <ul>
                                {data.length && data.map((file, index) =>
                                <li key={index}>{file}</li>
                                )}
                            </ul>
                        </div>
                    </MyPaper>
                </MyGrid>
                </MyGrid>
        );
      }
    }
  
    export default Uploader;