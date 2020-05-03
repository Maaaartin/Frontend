import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { isEmpty, toNumber } from 'lodash';

import upload from '../assets/chooseFile.png';
import TopContainer from '../components/TopContainer';
import Field from '../components/Field';
import Button from '../components/Button';
import Footer from '../components/Footer';
import GalleryModal from '../components/GalleryModal';
import Checkbox from '../components/Checkbox';

// TODO citate sources
class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            height: '500',
            width: '499',
            previews: '1',
            title: 'name',
            galleryModalOpen: false,
            modalPreviews: '1',
            errorModalOpen: false,
            galleries: [],
            selected: null,
            checked: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { galleryModalOpen } = this.state;
        const prevGalleryModalOpen = prevState.galleryModalOpen;
        // only on first modal open
        if (galleryModalOpen && galleryModalOpen !== prevGalleryModalOpen) {
            axios.get(`${global.END_POINT}/img`)
                .then(result => {
                    if (isEmpty(result.data)) return;
                    const galleries = result.data.map(item => ({
                        value: item,
                        label: item
                    })).sort()
                    this.setState({
                        galleries,
                        selected: galleries[0]
                    });
                })
                .catch(err => console.log(err));
        }
    }

    isEmpty = () => {
        const { files, height, width, previews, title, checked } = this.state;
        if (!checked) {
            if (!toNumber(height) || height < 1) {
                return true;
            }

            if (!toNumber(width) || width < 1) {
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

    handleSubmit = event => {
        event.preventDefault();
        const { history } = this.props;
        const { files, height, width, previews, title, checked } = this.state;

        if (!checked) {
            if (!toNumber(height) || height < 1) {
                return;
            }

            if (!toNumber(width) || width < 1) {
                return;
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

        if (!checked) {
            formData.append('height', height);
            formData.append('width', width);
        }
        formData.append('previews', previews);
        formData.append('title', title);

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
                console.log(err);
            });

    }

    handleGalleryClick = () => {
        const { modalPreviews, selected } = this.state;
        if (Number(modalPreviews) < 1) return;
        const { history } = this.props;
        history.push({
            pathname: '/gallery',
            state: {
                previews: modalPreviews,
                title: selected.value
            }
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

    handleSelectChange = selected => {
        this.setState({ selected });
    };

    render() {

        const { height, width, previews, title, galleryModalOpen, checked
        } = this.state;
        return [
            <GalleryModal
                open={galleryModalOpen}
                handleCloseClick={() => this.setState({ galleryModalOpen: false })}
            />,
            <TopContainer />,
            // https://tailwindcss.com/components/forms/

            <Row center='xs' className='m-auto mt-5 relative flex flex-col min-w-0 break-words w-1/2 mb-6 shadow-lg rounded-lg bg-gray-300 border-0 p-2'>
                <Row center='xs' className='w-full m-0'>
                    <Col style={{
                        width: '100px',
                        height: '100px',
                        margin: '60px auto 0 auto',
                        background: `url("${upload}") top center`,
                        position: 'relative',
                        padding: 0
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
                            noMargin
                        />
                    </Col>
                </Row>
                <Row center='xs' className='w-full m-0 mt-2'>
                    <Col sm={12}>
                        <Checkbox label='KEEP DIMENSIONS' checked={checked} onChange={result => this.setState({ checked: result })} />
                    </Col>
                </Row>
                {< Row center='xs' className='w-full m-0' >
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
                            disabled={checked}
                        />
                    </Col>
                </Row >}
                {
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
                                disabled={checked}
                            />
                        </Col>
                    </Row>
                }
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
