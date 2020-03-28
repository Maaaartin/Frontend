import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import ReactPaginate from 'react-paginate';
import { Col, Row } from 'react-styled-flexboxgrid';
import { withRouter } from 'react-router-dom';
import { TopContainer } from '../components/TopContainer';

const api = `${global.END_POINT}/img/`;
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
        const { files, previews } = this.props.location.state.data;
        const { title } = this.props.location.state;
        const images = files.map((item) => {
            const link = api + item.name;
            return {
                ...item,
                original: link,
                thumbnail: link,
                renderItem: (image) => {
                    return <img src={link} alt='' className='m-auto' style={{ width: image.width, height: image.height }} />
                }
            }
        });
        this.setState({
            images: images,
            pageCount: 3,// files.length / previews,
            perPage: previews,
            title: title
        });
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        this.setState({ currentPage: selectedPage });
    }

    handleBackClick = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { images, currentPage, perPage, pageCount, title } = this.state;

        // Logic for displaying images
        const indexOfLastTodo = (currentPage + 1) * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentImages = images.slice(indexOfFirstTodo, indexOfLastTodo);
        return [
            <TopContainer title={title}/>,
            <Row middle='xs'>
                <Col xs={12}>
                    <ImageGallery
                        showPlayButton={false}
                        items={currentImages}
                    />
                </Col>
            </Row>,
            <Row>
                <button onClick={this.handleBackClick}>
                    Back
            </button>
            </Row>,
            <Row middle='xs'>
                <Col xs={12}>
                    {pageCount > 1 && <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        // breakLabel={<span className="gap">...</span>}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick}
                        forcePage={currentPage}
                        containerClassName={'pagination'}
                        previousLinkClassName={""}
                        nextLinkClassName={""}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />}
                </Col>
            </Row>

        ];
    }
}

export default withRouter(Gallery);
