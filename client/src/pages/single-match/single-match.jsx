import { useStore } from "../../store/store";
import AppNavBar from "../../components/appnavbar.jsx";
import SingleMatchInnerPage from "./single-match-inner.jsx";
import { useNavigate } from "react-router";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import "../single-match/single-match.css";

function SingleMatchPage() {
    const params = useParams();
    const matchID = params.matchID;

    const [currentWeekNo, setCurrentWeekNo] = useState(4);
    const [loading,setLoading] = useState(false);

    const getCurrentWeek = async() => {
        await axios
            .get(`${process.env.REACT_APP_URL}/api/weeks/getWeek/`)
            .then(res => {
                setCurrentWeekNo(res.data.week_no);
                setLoading(true);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getCurrentWeek();
    }, []);

    return(
        <div>
            <AppNavBar/>
            <h1 style={{textAlign: "center", marginTop: "72px", marginBottom: "24px"}}>Match Details and Comments</h1>
            {loading && matchID ?
                <div className="matches">
                    <SingleMatchInnerPage matchID={matchID} currentWeekNo={currentWeekNo}/>
                </div>
                :
                <div className="d-flex justify-content-center">
                    <ReactBootstrap.Spinner animation="border"/>
                </div>
            }
        </div>
    )
}
export default SingleMatchPage