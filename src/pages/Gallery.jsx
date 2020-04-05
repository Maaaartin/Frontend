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
            perPage: 1,
            currentPage: 0,
            title: ''
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const api = `${global.END_POINT}/img/`;
        if (isEmpty(this.props.location.state)) return history.push('/');
        const { files, previews } = this.props.location.state.data;
        const { title } = this.props.location.state;
        const images = files.map((item) => {
            const link = api + item.name;
            return {
                ...item,
                original: link,
                thumbnail: link,
                renderItem: image => {
                    return (
                        <Row
                            center='xs'
                            style={{ height: '70vh' }}
                            className='m-auto' >
                            <img
                                src={link}
                                alt=''
                                className='m-auto'
                                style={{ width: image.width, height: image.height }}
                            />

                        </Row>);
                }
            };
        });
        this.setState({
            images: images,
            pageCount: files.length / previews,
            perPage: previews,
            title: title
        });
    }

    handlePageClick = data => this.setState({ currentPage: data.selected });

    handleBackClick = () => {
        const { history } = this.props;
        history.push('/');
    }


    handleDeleteClick = () => {
        const url = `${global.END_POINT}/delete/`;
        axios.get(url)
            .then(() => this.handleBackClick());
    }

    render() {
        const { images, currentPage, perPage, pageCount, title } = this.state;

        // Logic for displaying images
        const indexOfLastTodo = (currentPage + 1) * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentImages = images.slice(indexOfFirstTodo, indexOfLastTodo);
        const linkClass = 'inline-block pl-0 relative float-left text-white p-3 pl-3 rounded hover:bg-blue-300';
        return [
            <TopContainer title={title} />,
            <Row middle='xs' className='w-full m-0'>
                <Col xs={12}>
                    <ImageGallery
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
                        containerClassName={'justify-center flex'}
                        pageLinkClassName={linkClass}
                        activeLinkClassName='text-white bg-blue-500 border-blue-100 hover:bg-blue-500'
                        previousLinkClassName={linkClass}
                        nextLinkClassName={linkClass}
                        // subContainerClassName={'test'}
                        activeClassName={'active'}
                    />}
                </Col>
            </Row>,
            <Footer children={
                [<Button onClick={this.handleBackClick} text='Back' />,
                <Button onClick={this.handleDeleteClick} text='Delete' />
                ]} />
        ];
    }
}

export default withRouter(Gallery);
