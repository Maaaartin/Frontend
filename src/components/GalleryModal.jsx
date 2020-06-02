import React, { Component } from 'react';
import Modal from 'react-modal';
import Field from './Field';
import Button from './Button';
import { Row, Col } from "react-flexbox-grid";
import Select from 'react-select';
import { isEmpty } from "lodash";
import { withRouter } from 'react-router-dom';


/**
 * Creates modal window for selecting a gallery to display
 */
class GalleryModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            previews: '1'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { selected } = this.state;
        const { galleries } = this.props;
        if (!isEmpty(galleries) && isEmpty(selected)) {
            this.setState({ selected: galleries[0] });
        }
        if (isEmpty(galleries) && !isEmpty(selected)) {
            this.setState({ selected: null });
        }
    }

    handleGalleryClick = () => {
        const { previews, selected } = this.state;
        if (Number(previews) < 1) return;
        const { history } = this.props;
        history.push({
            pathname: '/gallery',
            state: {
                previews,
                title: selected.value
            }
        });
    }

    render() {
        const { open, handleCloseClick, galleries } = this.props;
        const { previews, selected } = this.state;
        return (
            <Modal
                isOpen={open}
                style={{
                    content: {
                        width: '50%',
                        height: '50%',
                        top: '25%',
                        left: '25%'
                    }
                }}>
                <Field
                    label='NUMBER OF PREVIEWS'
                    type='number'
                    id='previews'
                    name='previews'
                    value={previews}
                    onChange={event => {
                        let val = event.target.value;
                        if (!isEmpty(val) && Number(val) < 1) val = '1';
                        this.setState({ previews: val });
                    }}
                    onBlur={event => {
                        let val = event.target.value;
                        if (isEmpty(val)) val = '1';
                        this.setState({ previews: val })
                    }}
                />
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left mt-2"
                    for='galleries'>
                    Gallery name
                </label>
                <Select
                    id='galleries'
                    value={selected}
                    onChange={selected => this.setState({ selected })}
                    options={galleries}
                />
                <Row className='mt-2' center='xs'>
                    <Col xs={6} className='text-right'>
                        <Button
                            text='Show gallery'
                            onClick={this.handleGalleryClick}
                            disabled={previews < 1 || isEmpty(selected)}
                        />
                    </Col>
                    <Col xs={6} className='text-left'>
                        <Button
                            text='Close'
                            onClick={() => handleCloseClick()}
                            style={{ backgroundColor: 'gray' }}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default withRouter(GalleryModal);