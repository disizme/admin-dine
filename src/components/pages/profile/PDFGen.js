import { Document, Page, View, Text, Link, Image, StyleSheet, Font } from '@react-pdf/renderer'
import React, { Component } from 'react'
import logo from '../../../assets/img/brand/brand.png'
import QRCode from 'qrcode.react';


// Font.register({ family: 'Mukta', src: 'https://fonts.gstatic.com/s/ekmukta/v7/aFcjXdC5jyJ1p8w54wIIrg.ttf' });
// Font.register({family: 'Mukta', src: 'http://localhost:3000/favicon/Mukta.ttf'})

Font.registerHyphenationCallback(word => (
    [word]
  ));

const styles = StyleSheet.create({
    pageStyle: {
        // fontFamily: 'Mukta'
    },
    headerStyle: {
        fontSize: 40,
        fontWeight: "bold",
        marginHorizontal: 'auto',
        marginBottom: 20
    },
    cautionStyle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    infoStyle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    },
    qrStyle: {
        marginTop: 10,
        width: 180,
        height: 180,
        marginHorizontal: 'auto',
    },
    logoStyle: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        marginHorizontal: 'auto',
        borderRadius: 10,
        marginBottom: 10
    },
    footerLink: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        right: 30
    },
    footerLogo: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 60,
        height: 60
    },
    row: { display: "flex", flexDirection: "row", flexWrap: 'wrap',fontSize: 10},
    column: { display: "flex", flexDirection: "column", flexWrap: 'wrap',flexBasis: '49%',paddingHorizontal: 8},
})

function GetCheckInPage(props){
    return <Page size="A4" style={styles.pageStyle}>
    <View style={{marginHorizontal: '8%', marginVertical: 'auto'}}>
        <View style={styles.headerStyle}>
                <Image src={props.photo} style={styles.logoStyle} />
                <Text>{props.name}</Text>
        </View>
        <View style={styles.cautionStyle}>
                <Text style={{marginBottom: "10"}}>Welcome</Text>
            <Text>Before you check-in, we are required to collect contact information from at least 1 guest from your party.</Text>
        </View>
        <View>
                <Text style={styles.infoStyle}>Please Scan the QR Code below</Text>
        </View>
        <Image source={ {uri: props.image} } style={styles.qrStyle} />
        </View>
        <Text style={styles.footerLink}>
            <Link src="https://dinemate.com.au">Powered by Dinemate</Link>
        </Text>
        <Image style={styles.footerLogo} src={logo} />
    </Page>
}


function GetMenuPage(props){
    return <Page size="A4" style={styles.pageStyle}>
    <View style={{marginHorizontal: '8%', marginVertical: 'auto'}}>
        <View style={styles.headerStyle}>
                <Image src={props.photo} style={styles.logoStyle} />
                <Text>{props.name}</Text>
        </View>
        <View style={styles.cautionStyle}>
                <Text style={{fontWeight: "bold"}}>Our Menu</Text>
        </View>
        <View>
                <Text style={styles.infoStyle}>Please Scan the QR Code below</Text>
        </View>
        <Image source={ {uri: props.image} } style={styles.qrStyle} />
        </View>
        <Text style={styles.footerLink}>
            <Link src="https://dinemate.com.au">Powered by Dinemate</Link>
        </Text>
        <Image style={styles.footerLogo} src={logo} />
    </Page>
}
export default class PrintDoc extends Component {

    render() {
        return <Document title={`Dinemate`} author='Dinemate'>
            <GetCheckInPage image={this.props.checkin} photo={this.props.photo} name={this.props.name}/>
            <GetMenuPage image={this.props.menu} photo={this.props.photo} name={this.props.name}/>
        </Document>
}
}
