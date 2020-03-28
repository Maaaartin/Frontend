import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-styled-flexboxgrid';
import _ from 'lodash';
import upload from '../assets/chooseFile.png';
import { TopContainer } from '../components/TopContainer';
import { Field } from '../components/Field';

class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            height: 500,
            width: 499,
            previews: 1,
            title: 'name',
            message: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { history } = this.props;
        const { files, height, width, previews, title } = this.state;

        if (!_.isInteger(height) || height < 1) {
            this.setState({ message: 'Height invalid' });
            return;
        }

        if (!_.isInteger(width) || width < 1) {
            this.setState({ message: 'Width invalid' });
            return;
        }

        if (!_.isInteger(previews) || previews < 1) {
            this.setState({ message: 'Previews invalid' });
            return;
        }

        if (_.isEmpty(files)) {
            this.setState({ message: 'Files invalid' });
            return;
        }

        if (_.isEmpty(title)) {
            this.setState({ message: 'Gallery name invalid' });
            return;
        }

        const formData = new FormData();
        for (const item of files) {
            formData.append('filetoupload', item);
        }

        formData.append('height', height);
        formData.append('width', width);
        formData.append('previews', previews);

        axios.post(`${global.END_POINT}/fileupload/`,
            formData
        )
            .then((result) => {
                history.push({
                    pathname: '/gallery',
                    state: {
                        data: result.data,
                        title
                    }
                });
            }).catch((err) => {
                console.log(err);
            });

    }

    render() {
        const { height, width, previews, message, title } = this.state;
        return [
            <TopContainer />,
            // https://tailwindcss.com/components/forms/
            message && <p>{message}</p>,
            <form>
                <Row center='xs'>
                    <Col style={{
                        width: '100px',
                        height: '100px',
                        margin: '60px auto 0 auto',
                        background: `url("${upload}") top center`,
                        position: 'relative',
                        padding: 0,
                        cursor: ''
                    }}>
                        <Field
                            inputClassName='h-full opacity-0 cursor-pointer'
                            type="file"
                            accept="image/*"
                            name="filetoupload"
                            multiple="multiple"
                            onChange={event => this.setState({
                                files: event.target.files
                            })}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col>
                        <Field
                            label='HEIGHT'
                            type="number"
                            name="height"
                            id="height"
                            min="0"
                            value={height}
                            onChange={event => this.setState({
                                height: event.target.value
                            })}

                        />
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col>
                        <Field
                            label='WIDTH'
                            type="number"
                            name="width"
                            id="width"
                            min="0"
                            value={width}
                            onChange={event => this.setState({
                                width: event.target.value
                            })}
                        />
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col>
                        <Field
                            label='NUMBER OF PREVIEWS'
                            type="number"
                            name="previews"
                            id="previews"
                            min="0"
                            value={previews}
                            onChange={event => this.setState({
                                previews: event.target.value
                            })}
                        />
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col>
                        <Field
                            label='GALLERY NAME'
                            type='text'
                            name='name'
                            id='name'
                            value={title}
                            onChange={event => this.setState({
                                title: event.target.value
                            })}
                        />
                    </Col>
                </Row>
                <Row center='xs'>
                    <button type='submit' onClick={this.handleSubmit}>Submit</button>
                </Row>
            </form >
        ]
    }
}

export default withRouter(Index);
