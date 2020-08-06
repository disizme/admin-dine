import React, { Component } from 'react'
import QRCode from 'qrcode.react';
import { Button } from 'reactstrap';
import { Config } from '../../../Config';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PrintDoc from './PDFGen';

export default class QRGen extends Component {
    qrcheckurl = ""
    qrmenuurl = ""
    state ={
        pdfview: false
    }
    componentDidMount() {
        this.download()
    }

    download = () => {
        const canvas1 = document.querySelector('.qr-checkin > canvas');
        const canvas2 = document.querySelector('.qr-menu > canvas');
        this.qrcheckurl = canvas1.toDataURL('image/jpg', 0.3);
        this.qrmenuurl = canvas2.toDataURL('image/jpg', 0.3);
        this.setState({pdfview: true})
        // this.downloadRef.href = canvas.toDataURL('image/jpg', 0.3);
        // this.downloadRef.download = this.props.slug + this.state.size + this.props.pagefor+ "-QR.png";
    }


    render() {
        return (<>
                <div className=" d-none text-center">
                    <div className="HpQrcode qr-checkin ">
                        <QRCode
                            value={`${Config.qr_url}/${this.props.slug}/checkin`}
                            size={250}
                            level={'H'}
                        /><br/>
                    </div>
                    <div className="HpQrcode qr-menu">
                        <QRCode
                            value={`${Config.qr_url}/${this.props.slug}/menu`}
                            size={250}
                            level={'H'}
                        />
                    </div>
                </div>
                {this.state.pdfview && <Button className="brand-btn">
                <PDFDownloadLink
                    document={<PrintDoc checkin={this.qrcheckurl}
                        menu={this.qrmenuurl}
                        photo={this.props.data.photo}
                        name={this.props.data.name} />} fileName={`Dinemate-${this.props.slug}.pdf`}>
                        {({ blob, url, loading, error }) => (loading ? <i className="fa fa-spin fa-spinner" /> : 'Download now!')}
                </PDFDownloadLink>
                </Button>
                
                //     <PDFViewer height={700} width={500}>
                //     <PrintDoc checkin={this.qrcheckurl}
                //         menu={this.qrmenuurl}
                //         photo={this.props.data.photo}
                //         name={this.props.data.name} />
                //   </PDFViewer>
                }
                
                {/* <div className="text-center">
                    <a ref={(ref) => this.downloadRef = ref}>
                        Download QR Code
                    </a>
                </div> */}
            </>
        )
    };

}
