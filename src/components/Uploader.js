import React, {Component} from 'react';
import axios from 'axios';



class Uploader extends Component {

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0,
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
        })
            .then(res => {
                console.log(res.statusText)
        })
    }

  
        
    render() {
        return (
           <div>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" required name="file_upload" onChange={this.onChangeHandler}/>
                        </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                    </div>
                        
                    <button type="submit" onClick={this.onClickHandler}>Upload</button>

           </div>
        );
      }
    }
    
    export default Uploader;