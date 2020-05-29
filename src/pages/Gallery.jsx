import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import ReactPaginate from 'react-paginate';
import { Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import TopContainer from '../components/TopContainer';
import Button from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            pageCount: 0,
            perPage: 1,
            currentPage: 0,
            modalOpen: false,
            title: '',
            error: null
        };

        this.currentImg = null;
    }

    componentDidMount() {
        const { history } = this.props;
        if (isEmpty(this.props.location.state)) return history.push('/');
        this.fetchData();
    }

    fetchData = () => {
        const { previews } = this.props.location.state;
        const { title } = this.props.location.state;
        const api = `${global.END_POINT}/img/${title}`;
        axios.get(api)
            .then((result) => {
                const files = result.data;
                if (isEmpty(files)) return this.handleDeleteGalleryClick();
                const images = files.map((item) => {
                    const img = 'data:image/png;base64,' + item.data;
                    return {
                        ...item,
                        original: img,
                        thumbnail: img,
                        renderItem: image => {
                            this.currentImg = image.name;
                            console.log(this.currentImg);
                            const imgText = `Name: ${image.name}, Width ${image.width} px, Height ${image.height} px`;
                            return <Row
                                center='xs'
                                style={{ height: '70vh', overflow: 'hidden', paddingTop: '20px' }}
                                className='m-auto cursor-default relative' >
                                <img
                                    src={img}
                                    alt={imgText}
                                    className='m-auto'
                                    style={{ width: image.width, height: image.height }}
                                />
                                <span
                                    style={{ top: '1%', left: '2%', backgroundColor: 'white' }}
                                    className='m-auto absolute text-black text-sm font-semibold bg-white'>
                                    {imgText}
                                </span>
                            </Row>;
                        },
                        // to add alt attribute
                        renderThumbInner: (image) => {
                            return <img
                                src={img}
                                alt={`${image.name}, ${image.height} x ${image.width}`}
                            />
                        }
                    };
                });
                this.setState({
                    images: images,
                    pageCount: files.length / previews,
                    perPage: previews,
                    title: title,
                    currentPage: 0
                });
            }).catch((err) => {
                this.setState({ error: 'Could not fetch data from server.' });
                console.log(err);
            });
    }

    handlePageClick = data => this.setState({ currentPage: data.selected });

    goBack = () => {
        const { history } = this.props;
        const { error } = this.state;
        if (error) this.setState({ error: null });
        history.push('/');
    }

    handleDeleteGalleryClick = () => {
        const { title } = this.state;
        const url = `${global.END_POINT}/delete/${title}`;
        axios.get(url)
            .finally(() => this.goBack());
    }

    handleDeleteFileClick = () => {
        const { title } = this.state;
        axios.get(`${global.END_POINT}/delete/${title}/${this.currentImg}`)
            .then((result) => {
                this.fetchData();
            })
            .catch((err) => {
                this.setState({ error: 'Could not delete image' });
            });
    }

    render() {
        const { images, currentPage, perPage, pageCount, title, error } = this.state;
        // Logic for displaying images
        const lastIndex = (currentPage + 1) * perPage;
        const firstIndex = lastIndex - perPage;
        const currentImages = images.slice(firstIndex, lastIndex);
        const linkClass = 'py-1 px-2 block no-underline border-t-1 border-l-1 border-b-1 text-blue hover:bg-blue-400 transition duration-150 rounded-full';
        return [
            <Modal
                isOpen={!isEmpty(error)}
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
                    <Button
                        text='Back to main page'
                        onClick={this.goBack}
                    />
                </Row>
            </Modal>,
            <TopContainer title={title} />,
            <Row middle='xs' className='w-full m-0'>
                <Col xs={12}>
                    <ImageGallery
                        showPlayButton={false}
                        items={currentImages}
                        showFullscreenButton={isEmpty(error)}

                    />
                </Col>
            </Row>,
            <Row middle='xs' className='w-full m-0'>
                <Col xs={12}>
                    {pageCount > 1 && <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon={faArrowLeft} size='sm' />}
                        nextLabel={<FontAwesomeIcon icon={faArrowRight} size='sm' />}
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick}
                        forcePage={currentPage}
                        containerClassName='justify-center flex'
                        pageLinkClassName={linkClass + ' mr-1'}
                        activeLinkClassName='text-white bg-blue-500 border-blue-100 hover:bg-blue-500'
                        previousLinkClassName={linkClass + ' mr-1'}
                        nextLinkClassName={linkClass}
                    />}
                </Col>
            </Row>,
            <Footer children={
                [<Button onClick={this.goBack} text='Back' />,
                <Button onClick={this.handleDeleteGalleryClick}
                    text='Delete gallery'
                    style={{ marginLeft: '20px' }} />,
                <Button
                    text='Delete current image'
                    onClick={this.handleDeleteFileClick}
                    style={{ marginLeft: '20px' }} />
                ]} />
        ];
    }
}

export default withRouter(Gallery);
