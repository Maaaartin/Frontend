import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { isEmpty, toNumber } from 'lodash';
import Modal from 'react-modal';

import upload from '../assets/chooseFile.png';
import TopContainer from '../components/TopContainer';
import Field from '../components/Field';
import Button from '../components/Button';
import Footer from '../components/Footer';
import GalleryModal from '../components/GalleryModal';
import Checkbox from '../components/Checkbox';

class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            height: '100',
            width: '200',
            previews: '1',
            title: '',
            galleryModalOpen: false,
            modalPreviews: '1',
            errorModalOpen: false,
            galleries: [],
            keepChecked: false,
            x: '1',
            y: '1',
            offsetChecked: false,
            error: null,
            processing: false
        }
    }


    componentDidMount() {
        document.title = 'Photogallery';
    }

    componentDidUpdate(prevProps, prevState) {
        const { galleryModalOpen } = this.state;
        const prevGalleryModalOpen = prevState.galleryModalOpen;
        // only on first modal open
        if (galleryModalOpen && galleryModalOpen !== prevGalleryModalOpen) {
            axios.get(`${global.END_POINT}/img`)
                .then(result => {
                    if (isEmpty(result.data)) {
                        this.setState({ galleries: [] });
                        return;
                    }
                    const galleries = result.data.map(item => ({
                        value: item,
                        label: item
                    })).sort()
                    this.setState({ galleries });
                })
                .catch(err => console.log(err));
        }
    }

    isEmpty = () => {
        const { files, height, width, previews, title, keepChecked, x, y, offsetChecked } = this.state;
        if (!keepChecked) {
            if (!toNumber(height) || height < 1) {
                return true;
            }

            if (!toNumber(width) || width < 1) {
                return true;
            }
        }

        if (!offsetChecked) {
            if (!toNumber(x) || x < 1) {
                return true;
            }

            if (!toNumber(y) || y < 1) {
                return true;
            }
        }

        if (!toNumber(previews) || previews < 1) {
            return true;
        }

        if (isEmpty(files)) {
            return true;
        }

        if (isEmpty(title)) {
            return true;
        }
        return false;
    }

    /**
     * Check form data for validity and sends form
     */
    handleSubmit = event => {
        event.preventDefault();
        const { history } = this.props;
        const { files, height, width, previews, title, keepChecked, x, y, offsetChecked } = this.state;

        if (!keepChecked) {
            if (!toNumber(height) || height < 1) {
                return;
            }

            if (!toNumber(width) || width < 1) {
                return;
            }
        }

        if (!offsetChecked) {
            if (!toNumber(x) || x < 1) {
                return true;
            }

            if (!toNumber(y) || y < 1) {
                return true;
            }
        }

        if (!toNumber(previews) || previews < 1) {
            return;
        }

        if (isEmpty(files)) {
            return;
        }

        if (isEmpty(title)) {
            return;
        }

        const formData = new FormData();
        for (const item of files) {
            formData.append('filetoupload', item);
        }

        if (!keepChecked) {
            formData.append('height', height);
            formData.append('width', width);
        }
        if (!offsetChecked) {
            formData.append('x', x);
            formData.append('y', y);
        }
        formData.append('previews', previews);
        formData.append('title', title);

        this.setState({ processing: true });
        axios.post(`${global.FILE_UPLOAD}`,
            formData
        )
            .then(() => {
                history.push({
                    pathname: '/gallery',
                    state: {
                        previews,
                        title
                    }
                });
            }).catch((err) => {
                if (err && err.response) this.setState({ processing: false, error: !isEmpty(err.response.data) ? err.response.data : 'No further error message' });
                console.log(err);
            });

    }

    setChange = (attribute, value) => {
        if (!isEmpty(value) && Number(value) < 1) value = '1';
        this.setState({ [attribute]: value });
    }

    setBlur = (attribute, value) => {
        if (isEmpty(value)) {
            this.setState({ [attribute]: '1' });
        }
    }

    onEnter = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit(event);
        }
    }
    render() {
        const { height, width, previews, title, galleryModalOpen, keepChecked, x, y, offsetChecked, error, processing, galleries
            , files } = this.state;
        return [
            <Modal

                isOpen={processing}
                style={{
                    content: {
                        width: '200px',
                        height: '90px',
                        top: '35%',
                        left: '45%',
                        paddingLeft: '60px',
                        paddingTop: '30px'
                    }
                }}>
                Processing...
            </Modal>,
            <Modal
                isOpen={error}
                style={{
                    content: {
                        width: '50%',
                        height: '25%',
                        top: '25%',
                        left: '25%'
                    }
                }}>
                <Row center='xs' className='text-2xl'>An Error occured</Row>
                <Row center='xs' className='mb-2'>{error}</Row>
                <Row center='xs'>
                    <Col xs={6}>
                        <Button
                            text='Go to gallery'
                            onClick={() => this.setState({ error: null, galleryModalOpen: true })}
                        />
                    </Col>
                    <Col xs={6}> <Button
                        text='Close'
                        onClick={() => this.setState({ error: null })}
                        style={{ backgroundColor: 'gray' }}
                    />
                    </Col>
                </Row>
            </Modal>,
            <GalleryModal
                open={galleryModalOpen}
                handleCloseClick={() => this.setState({ galleryModalOpen: false })}
                galleries={galleries}
            />,
            <TopContainer />,

            <Row center='xs' className='m-auto mt-5 relative flex flex-col min-w-0 break-words w-1/2 mb-6 shadow-lg rounded-lg bg-gray-300 border-0 pb-2'>
                <Row center='xs' className='w-full m-0 mt-2'>
                    <Col sm={12}>
                        {'Selected files:' + (isEmpty(files) ? ' -' : Object.keys(files).map((item, index) => {
                            return ' ' + files[index].name
                        }))
                        }
                    </Col>
                </Row>
                <Row center='xs' className='w-full m-0'>
                    <Col style={{
                        width: '100px',
                        height: '100px',
                        margin: '30px auto 0 auto',
                        background: `url("${upload}") top center`,
                        position: 'relative',
                        padding: 0
                    }}>
                        <Field
                            inputClassName='h-full opacity-0 cursor-pointer'
                            type="file"
                            accept="image/png,image/gif,image/jpeg"
                            name="filetoupload"
                            multiple="multiple"
                            onChange={event => this.setState({
                                files: event.target.files
                            })}
                            style={{ width: '100px', height: '100px' }}
                            noMargin
                        />
                    </Col>
                </Row>
                <Row center='xs' className='w-full m-0 mt-2'>
                    <Col sm={12}>
                        <Checkbox label='KEEP DIMENSIONS' checked={keepChecked} onChange={result => this.setState({ keepChecked: result })} />
                    </Col>
                </Row>

                <Row center='xs' className='w-full m-0 mt-2'>
                    <Col sm={12}>
                        <Checkbox label='AUTO OFFSET' checked={offsetChecked || keepChecked} onChange={result => this.setState({ offsetChecked: result })} />
                    </Col>
                </Row>

                < Row center='xs' className='w-full m-0' >
                    <Col xs={8}>
                        <Field
                            label='HEIGHT (px)'
                            type="number"
                            name="height"
                            id="height"
                            min="1"
                            value={height}
                            onChange={event => this.setChange('height', event.target.value)}
                            onBlur={event => this.setBlur('height', event.target.value)}
                            disabled={keepChecked}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row >

                <Row center='xs' className='w-full m-0'>
                    <Col xs={8}>
                        <Field
                            label='WIDTH (px)'
                            type="number"
                            name="width"
                            id="width"
                            min="1"
                            value={width}
                            onChange={event => this.setChange('width', event.target.value)}
                            onBlur={event => this.setBlur('width', event.target.value)}
                            disabled={keepChecked}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row>

                <Row center='xs' className='w-full m-0'>
                    <Col xs={8}>
                        <Field
                            label='HORIZONTAL OFFSET (px)'
                            type="number"
                            name="x"
                            id="x"
                            min="1"
                            value={x}
                            onChange={event => this.setChange('x', event.target.value)}
                            onBlur={event => this.setBlur('x', event.target.value)}
                            disabled={offsetChecked || keepChecked}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row>

                <Row center='xs' className='w-full m-0'>
                    <Col xs={8}>
                        <Field
                            label='VERTICAL OFFSET (px)'
                            type="number"
                            name="y"
                            id="y"
                            min="1"
                            value={y}
                            onChange={event => this.setChange('y', event.target.value)}
                            onBlur={event => this.setBlur('y', event.target.value)}
                            disabled={offsetChecked || keepChecked}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row>

                <Row center='xs' className='w-full m-0'>
                    <Col xs={8}>
                        <Field
                            label='NUMBER OF PREVIEWS'
                            type="number"
                            name="previews"
                            id="previews"
                            min="1"
                            value={previews}
                            onChange={event => this.setChange('previews', event.target.value)}
                            onBlur={event => this.setBlur('previews', event.target.value)}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row>
                <Row center='xs' className='w-full m-0'>
                    <Col xs={8}>
                        <Field
                            label='GALLERY NAME'
                            type='text'
                            name='name'
                            id='name'
                            value={title}
                            onChange={event => this.setState({
                                title: event.target.value
                            })}
                            onKeyDown={this.onEnter}
                        />
                    </Col>
                </Row>
                <Row center='xs' className='w-full m-0 mt-3'>
                    <Button
                        onClick={this.handleSubmit}
                        type='submit'
                        text='Submit'
                        disabled={this.isEmpty()}
                    />
                </Row>
            </Row >,
            <Footer children={
                <Button text='To gallery' onClick={() => this.setState({ galleryModalOpen: true })} />
            } />
        ];
    }
}

export default withRouter(Index);
