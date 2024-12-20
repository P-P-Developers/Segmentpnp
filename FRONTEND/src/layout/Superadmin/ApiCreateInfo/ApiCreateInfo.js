/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react'
import Content from "../../../Components/Dashboard/Content/Content"
import { useDispatch } from "react-redux";
import { All_Api_Info_List_superadmin } from '../../../ReduxStore/Slice/Superadmin/ApiCreateInfoSlice';
import Modal from '../../../Components/ExtraComponents/Modal';
import { Eye, CandlestickChart, Pencil } from 'lucide-react';
import { Link } from "react-router-dom";
import * as Config from "../../../Utils/Config";


const ApiCreateInfo = () => {
    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem("user_details")).token;


    const [showModal, setshowModal] = useState(false)
    const [modalData, setModalData] = useState([])



    const [UserDetails, setUserDetails] = useState({
        loading: true,
        data: [],
    });




    const data = async () => {

        await dispatch(All_Api_Info_List_superadmin({ token: token, url: Config.react_domain })).unwrap()
            .then((response) => {
                if (response.status) {
                    setUserDetails({
                        loading: false,
                        data: response.data
                    });
                }
            })
    }
    useEffect(() => {
        data()
    }, [])


    const ShowData = (item) => {
        setshowModal(true)
        setModalData(item)
    }



    return <>
        <Content Page_title="All Api-Create Info's" button_title='Create Api Info' route='/super/apicreateinfo/add'>


            <div className="row">
                <section className="card__container">

                    {/* {UserDetails.data && UserDetails.data.slice(0, 1).map((item) => { */}
                    {UserDetails.data && UserDetails.data.map((item) => {
                        return <>
                            <div className="card__bx card__1">
                                <div className="card__data">
                                    <div className="card__icon">
                                        <div className="card__icon-bx">
                                            <CandlestickChart />
                                        </div>
                                    </div>

                                    <div className="card__content">
                                        <h3>{item.title}</h3>
                                        <Link style={{
                                            marginRight: '20px',
                                            marginBottom: '20px',
                                            marginTop: '20px',
                                        }} onClick={() => ShowData(item)} >
                                            <Eye className='mx-2' />
                                        </Link>
                                        <Link to="/super/apicreateinfo/edit" state={item}>
                                            <Pencil className='mx-2' onClick={() => ShowData(item)} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </section>
            </div>

            <Modal isOpen={showModal} size="lg" title={`${modalData.title}  API Create Information.`} hideBtn={true}
                handleClose={() => setshowModal(false)}
            >
                <h4>API Process of {modalData.title}: -</h4>
                {modalData.description ?
                    <ul>
                        {modalData.description && modalData.description.split("\n").map((line, index) => (
                            <>
                                <li key={index}>{line}</li><br />
                            </>
                        ))}
                    </ul>
                    : ""
                }

                {modalData.steptwourl || modalData.imageone ? <>
                    <h4 className="text-decoration-underline">Step 1:  Click below link and Login</h4>
                    <a href={modalData.steponeurl} target="_blank" className="my-3" >{modalData.steponeurl} </a><br />
                    {/* <a
                        href={
                            "https://ant.aliceblueonline.com/?appcode=G9EOSWCEIF9ARCB"
                        }
                        target="_blank"
                        className="my-3"
                    >
                        https://ant.aliceblueonline.com/?appcode=G9EOSWCEIF9ARCB
                    </a> */}
                    <br />
                    {modalData.imageone ? <img src={modalData.imageone} alt="" className="w-100 my-3 border border-dark" /> : ""}

                </> : ""}

                {modalData.steptwourl || modalData.imagetwo ? <>

                    <h4 className="text-decoration-underline my-3">Step 2:  Enter your Details and the Redirect URL which is given below.</h4>
                    <a
                        href={`${Config.base_url + modalData.steptwourl}`}
                        target="_blank"
                    >
                        {`${Config.base_url + modalData.steptwourl}`}
                    </a>
                    <br />
                    {modalData.imagetwo ? <img src={modalData.imagetwo} alt="" className="w-100 border border-dark" /> : ""}
                </> : ""}

                {modalData.imagethree || modalData.imagethree ? <>
                    <h4 className="text-decoration-underline my-3">Step 3:  Create API</h4>


                    {modalData.stepthree.includes("http") ? <>
                        <a href={modalData.stepthreeurl} target="_blank"  >{modalData.stepthree} </a>
                    </> :

                        <ul>
                            {modalData.stepthree && modalData.stepthree.split("\n").map((line, index) => (
                                <>
                                    <li className="text-alert mt-2" key={index}>{line}</li>
                                </>
                            ))}
                        </ul>
                    }

                    <br />
                    <br />
                    {modalData.imagethree ? <img src={modalData.imagethree} alt="" className="w-100 border border-dark" /> : ""}
                </> : ""}


                {modalData.note ?
                    <ul>
                        {modalData.note && modalData.note.split("\n").map((line, index) => (
                            <>
                                <li className=" h3 text-alert mt-3 text-info" key={index}>{line}</li><br />
                            </>
                        ))}
                    </ul>
                    : ""
                }
                {/* {modalData.note ?
                    <h3 className="text-alert my-3 text-info">NOTE- {modalData.note}</h3>
                    : ""} */}

                {modalData.youtubeurl ?
                    <>
                        <h4 className="text-decoration-underline mt-3">For your convenience, we have made these videos available for you to watch.</h4>
                        <a href={modalData.youtubeurl} target="_blank" className="btn btn-primary mx-3" >Youtube</a>
                    </>
                    : ""}



            </Modal>

        </Content>
        )
    </>
}


export default ApiCreateInfo