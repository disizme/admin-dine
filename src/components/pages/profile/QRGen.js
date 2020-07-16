import React, { Component } from 'react'
import QRCode from 'qrcode.react';
import { ButtonGroup, Button } from 'reactstrap';
import { Config } from '../../../Config';

export default class QRGen extends Component {
    state={
        size: 100
    }

    componentDidMount() {
        this.download()
    }

    download = () => {
        const canvas = document.querySelector('.HpQrcode > canvas');
        this.downloadRef.href = canvas.toDataURL();
        this.downloadRef.download = this.props.slug + this.state.size + this.props.pagefor+ "-QR.png";
    }

    selectSize = (id) => {
        this.setState({
            size: id
        })
        setTimeout(()=> {
            this.download()
        },1000)
    }
    render() {
        let {size} = this.state
        return (<>
                <div className="text-center mb-2">
                    <ButtonGroup>
                        <Button className={size === 100 ? "active" : ""} onClick={() => this.selectSize(100)}>
                            100px
                        </Button>
                        <Button className={size === 200 ? "active" : ""} onClick={() => this.selectSize(200)}>
                            200px
                        </Button>
                        <Button className={size === 300 ? "active" : ""} onClick={() => this.selectSize(300)}>
                            300px
                        </Button>
                        <Button className={size === 400 ? "active" : ""} onClick={() => this.selectSize(400)}>
                            400px
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="text-center">
                    <div className="HpQrcode ">
                        <QRCode
                            value={`${Config.qr_url}${this.props.slug}/${this.props.pagefor}`}
                            size={size}
                            level={'H'}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <a ref={(ref) => this.downloadRef = ref}>
                        Download QR Code
                    </a>
                </div>
            </>
        )
    };

}
