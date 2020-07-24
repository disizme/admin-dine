import React, { useState, useEffect, Fragment } from 'react'
import { connect } from "react-redux";
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Card, CardBody } from 'reactstrap';
import FoodItem from './FoodItem';
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Waypoint } from 'react-waypoint';
import TopHeader from '../common/Topheader';
import userProfile from '../../../../actions/diners/admin/user_profile';
import MainLogo from '../../../shared/diners/logo/MainLogo';
import { Loader } from '../../../shared/diners/loader/PageLoader';
import fetchFoodMenu from '../../../../actions/diners/foodmenu/fetch_foodmenu';
import fetchCategory from '../../../../actions/diners/category/fetch_category';
import store from '../../../../Store';

function FoodMenu(props) {
    const slug= props.match.params.slug
    const [showCategory, setCategory] = useState("")
    const [popup, setPopup] = useState(false)
    const [allCategories, setAllCategories] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        if(!userProfile.success){
            store.dispatch(userProfile(slug))
        }
        if(!fetchCategory.success){
            store.dispatch(fetchCategory(slug))
        }
        if(!fetchFoodMenu.success){
            setTimeout(() => {
                store.dispatch(fetchFoodMenu(slug))
            },1000)
        }
    }, [])

    useEffect(() => {
        const {success} = props.userProfile
        if(success){
            document.title = success.data.name + ' | Menu and Prices'
        }
    }, [props.userProfile])

    useEffect(() => {
        const {success} = props.fetchCategory
        if(success){
            if(success.data && success.data.results && success.data.results.length){
                setCategory(success.data.results[0].id)
                setAllCategories(success.data.results)
            }
        }
    }, [props.fetchCategory])

    useEffect(() => {
        const {success} = props.fetchFoodMenu
        if(success){
            if(success.data && success.data.results && success.data.results.length){
                let foodie = success.data.results
                // let foodie = success.data.filter(i => i.category_id === showCategory)
                if(props.fetchCategory.success){
                    let allItems = props.fetchCategory.success.data.results.map(i => {
                        let eachCat = foodie.filter(j => j.category_name === i.name)
                        return { name: i.name, items: eachCat }
                    })
                    setFoodItems(allItems)
                }
            }
        }
    }, [props.fetchFoodMenu])

    // function updateItems(id){
    //     setCategory(id)
    //     let foodie = props.fetchFoodMenu.success.data.filter(i => i.category_id === id)
    //     setFoodItems(foodie)
    // }

    // function updateData(sentFor, id){
    //     let currentData = [...data]
    //     if(sentFor === "remove"){
    //         let ind = currentData.findIndex(i => { i.id === id})
    //         currentData.splice(ind, 1)
    //     }else{
    //         let addItem = props.fetchFoodMenu.success.data.find(i => i.id === id)
    //         currentData.push(addItem)
    //     }
    //     setData(currentData)
    // }

    // function onComplete(){
    //     setPopup(!popup)
    // }

    function scrollNow(name){
        var element = document.getElementById(name);
        var headerOffset = 50;
        var elementPosition = element.offsetTop;
        var offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // function scrollNav(name){
    //     // document.getElementById(name).scrollIntoView()
    //     window.scrollTo(document.getElementById(name).offsetLeft - document.getElementById(name).offSetWidth, window.scrollY);
    // }

    function changeNav(name){
        let allcats = document.querySelectorAll("#food-categories div");
        for (var i = 0; i < allcats.length; ++i) {
            allcats[i].classList.remove('brand-color');
        }
        let activeCat = document.getElementById(`category-${name}`)
        activeCat.classList.add("brand-color")
        activeCat.scrollIntoView()
        // scrollNav(`category-${name}`)

        // let categoryContainer = document.getElementById(`food-categories`)
        // let elementMid = activeCat.offsetLeft + activeCat.offsetWidth/2
        // if(elementMid < categoryContainer.scrollLeft){
        //     categoryContainer.scrollTo(-elementMid, 0)
        // }else if(elementMid > (window.innerWidth + categoryContainer.scrollLeft)){
        //     categoryContainer.scrollTo(activeCat.offsetWidth, 0)
        // }
    }
    return <div className="App">
        {/* <TopHeader /> */}
            <div className="restro-theme" >
                <Card className="mx-auto">
                    <CardBody>
                    <MainLogo photo={props.userProfile.success ? props.userProfile.success.data.photo : null} 
                        className="text-center my-0" />
                    <h3>
                        {props.userProfile.success && props.userProfile.success.data.name}</h3>
                    {/* <div>
                        Pizza and Fast Foods
                    </div> */}
                    <div>
                    <FaMapMarkerAlt className="mr-1" />
                    {props.userProfile.success && 
                    `${props.userProfile.success.data.address} ${props.userProfile.success.data.city} ${props.userProfile.success.data.postal}`}
                    </div>
                    </CardBody>
                </Card>
            </div>
            {(props.fetchCategory.success && props.fetchFoodMenu.success) ? <Fragment>
            <div className="food-category container-fluid d-flex px-2" id="food-categories">
                    {allCategories.map(i => {
                        return <Col className={`px-2 py-3 `} id={`category-${i.name}`}
                            onClick={() => scrollNow(i.name)}
                             key={`cat-${i.name}`}
                             xs='4' md='2' lg='2' sm='3'>
                                 {i.name}
                        </Col>
                    })}
            </div>
            <div className="container-fluid">
            {
                foodItems.map((i,ind) => {
                    return <div key={`${i.name}-${ind}`} id={i.name}>
                        <h3 className="ml-3 mt-1">{i.name}</h3>
                        <Waypoint
                            onEnter={() => changeNav(i.name)}
                        />
                        <div className="food-items text-left">
                            <Row>
                                {i.items.map(j => {
                                    return <Col key={`food-${j.id}`}
                                        xs="12" sm="6" md="6" lg="4"
                                        className="mb-2">
                                        <FoodItem food={j}
                                            foodData={data}
                                            // onUpdate={(x, y) => updateData(x, y)}
                                             />
                                    </Col>
                                })}
                            </Row>
                            {/* <Waypoint
                            onLeave={() => console.log("left ", i.name)}
                        /> */}
                        </div>
                    </div>
                })
            }
            </div>            
            {/* {data.length ? <div className="bottom-menu">
                <div className="text-right">
                    <Button className="btn btn-sm brand-component" onClick={() => setPopup(true)}>
                        Finish Order
                    </Button>
                </div>
            </div>
            :<div></div>} */}
            </Fragment>
            : <Loader />}
            {/* {popup && <Modal isOpen={popup} toggle={onComplete}>
                <ModalHeader className="brand-color">Your Order</ModalHeader>
                <ModalBody>
                    {data.map(i => {
                        return <Row>
                            <Col className="col-9">
                            {i.name}
                            </Col>
                            <Col className="col-3">
                            <i>$ {i.price}</i>
                            </Col>
                        </Row>
                    })}
                </ModalBody>
                <div className="text-right mx-4 mb-3">
                    <Button className="brand-component btn-sm"
                     onClick={() => onComplete()}>Confirm Order</Button>
                </div>
            </Modal>} */}
        </div>
    }

function mapStateToProps(state) {
    let { customerCheckin, fetchCategory, fetchFoodMenu, userProfile } = state
    return {
        customerCheckin, fetchCategory, fetchFoodMenu, userProfile
    }
}

export default connect(mapStateToProps)(FoodMenu)
