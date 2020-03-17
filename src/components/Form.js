import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            height: 500,
            width: 500,
            previews: 5
        }
    }

    handleFilesChange = event => {
        this.setState({
            files: event.target.files
        });
    };

    handleHeightChange = event => {
        this.setState({
            height: event.target.value
        });
    };

    handleWidthChange = event => {
        this.setState({
            width: event.target.value
        });
    };

    handlePreviewsChange = event => {
        this.setState({
            previews: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { history } = this.props;
        const { files, height, width, previews } = this.state;

        const formData = new FormData();
        for (const item of files) {
            formData.append('filetoupload', item);
        }

        formData.append('height', height);
        formData.append('width', width);
        formData.append('previews', previews);

        axios.post('http://localhost/fileupload',
            formData
        )
            .then((result) => {
                history.push({
                    pathname: '/gallery',
                    state: { files: result.data }
                });
            }).catch((err) => {
                console.log(err);
            });

    }
    render() {
        const { height, width, previews } = this.state;
        return (
            // <form className='w-full max-w-lg' onSubmit={this.handleSubmit}>
            //     <div className='flex flex-wrap -mx-3 mb-6'>
            //         <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            //             <input
            //                 type="file"
            //                 accept="image/*"
            //                 name="filetoupload"
            //                 multiple="multiple"
            //                 // value={files}
            //                 onChange={this.handleFilesChange}
            //             />
            //         </div>

            //         <div>
            //             <label>HEIGHT</label>
            //             <input
            //                 type="number"
            //                 name="height"
            //                 id="height"
            //                 min="0"
            //                 value={height}
            //                 onChange={this.handleHeightChange}
            //             />
            //         </div>
            //         <div>
            //             <label>WIDTH</label>
            //             <input
            //                 type="number"
            //                 name="width"
            //                 id="width"
            //                 min="0"
            //                 value={width}
            //                 onChange={this.handleWidthChange}
            //             />
            //         </div>
            //         <div>
            //             <label>NUMBER OF PREVIEWS</label>
            //             <input
            //                 type="number"
            //                 name="width"
            //                 id="width"
            //                 min="0"
            //                 value={previews}
            //                 onChange={this.handlePreviewsChange}
            //             />
            //         </div>
            //         <div className="buttons">
            //             <button type="submit" name="files">
            //                 Add to photo gallery
            //     </button>
            //         </div>
            //     </div>
            // </form>
// https://tailwindcss.com/components/forms/
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="file"
                            accept="image/*"
                            name="filetoupload"
                            multiple="multiple"
                            // value={files}
                            onChange={this.handleFilesChange}
                        />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="height">
                            HEIGHT
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="number"
                            name="height"
                            id="height"
                            min="0"
                            value={height}
                            onChange={this.handleHeightChange} />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="width">
                            WIDTH
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            name="width"
                            id="width"
                            min="0"
                            value={width}
                            onChange={this.handleWidthChange}
                        />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="previews">
                            NUMBER OF PREVIEWS
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            name="previews"
                            id="previews"
                            min="0"
                            value={previews}
                            onChange={this.handlePreviewsChange}
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default withRouter(Form);
