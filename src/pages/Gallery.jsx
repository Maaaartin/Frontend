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

// styles
// https://stackoverflow.com/questions/52477591/react-pagination-styling-in-global-css-not-working
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            pageCount: 0,
            perPage: 1,
            currentPage: 0,
            modalOpen: false,
            title: ''
        };
    }

    // TODO and sizes to images
    componentDidMount() {
        const { history } = this.props;
        if (isEmpty(this.props.location.state)) return history.push('/');
        const { previews } = this.props.location.state;
        const { title } = this.props.location.state;
        const api = `${global.END_POINT}/img/${title}/`;
        axios.get(api)
            .then((result) => {
                console.log(result);
                const files = result.data;
                const images = files.map((item) => {
                    const img = 'data: image/png;base64, ' + item.data;
                    return {
                        ...item,
                        original: img,
                        thumbnail: img,
                        renderItem: image => {
                            return (
                                <Row
                                    center='xs'
                                    style={{ height: '70vh' }}
                                    className='m-auto cursor-default' >
                                    <img
                                        src={img}
                                        alt={image.name}
                                        className='m-auto'
                                        style={{ width: image.width, height: image.height }}
                                    />
                                </Row>);
                        },
                        // renderThumbInner: () => console.log('test')
                        // bulletClass: 'cursor-default'
                    };
                });
                this.setState({
                    images: images,
                    pageCount: files.length / previews,
                    perPage: previews,
                    title: title
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    handlePageClick = data => this.setState({ currentPage: data.selected });

    handleBackClick = () => {
        const { history } = this.props;
        history.push('/');
    }

    handleDeleteClick = () => {
        const { title } = this.state;
        const url = `${global.END_POINT}/img/delete/${title}/`;
        axios.get(url)
            .then(() => this.handleBackClick());
    }

    // TODO page layout wrong before loading images - download images
    render() {
        const { images, currentPage, perPage, pageCount, title } = this.state;
        // Logic for displaying images
        const indexOfLastTodo = (currentPage + 1) * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentImages = images.slice(indexOfFirstTodo, indexOfLastTodo);
        // const linkClass = 'bg-gray-400 inline-block pl-0 relative float-left text-white p-3 pl-3 rounded hover:bg-blue-300';
        const linkClass = 'p-3 block no-underline border-t-1 border-l-1 border-b-1 bg-gray-500 text-blue hover:bg-blue-400 transition duration-150'
        return [
            <TopContainer title={title} />,
            <Row middle='xs' className='w-full m-0'>
                <Col xs={12}>
                    <ImageGallery
                        additionalClass='cursor-default'
                        showPlayButton={false}
                        items={currentImages}
                    />
                </Col>
            </Row>,
            <Row middle='xs' className='w-full m-0'>
                <Col xs={12}>
                    {pageCount > 1 && <ReactPaginate
                        previousLabel='<'
                        nextLabel='>'
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick}
                        forcePage={currentPage}
                        containerClassName='justify-center flex'
                        pageLinkClassName={linkClass}
                        activeLinkClassName='text-white bg-blue-500 border-blue-100 hover:bg-blue-500'
                        previousLinkClassName={linkClass + ' transition duration-150'}
                        nextLinkClassName={linkClass}
                        // subContainerClassName='bg-black'
                        activeClassName='active'
                    />}
                </Col>
            </Row>,
            <Footer children={
                [<Button onClick={this.handleBackClick} text='Back' />,
                <Button onClick={this.handleDeleteClick} text='Delete'
                    style={{ marginLeft: '20px' }} />
                ]} />
        ];
    }
}

export default withRouter(Gallery);
