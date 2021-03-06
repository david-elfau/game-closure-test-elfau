import React, { useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Context, actionTypes } from '../helpers/Store';
import Helpers from '../helpers/Helpers';

function ProducerPanel(props) {
    const { store, dispatch } = useContext(Context);
    const { businessData } = props;

    let level = store.businesses[businessData.id].level;
    const productionTime = businessData.timer[level];

    let remainingTime = productionTime - (Date.now() - store.businesses[businessData.id].timestamp) * 0.001;
    let progress = 100 * (businessData.timer[level] - remainingTime) / productionTime;

    if (remainingTime <= 0) {
        if (store.businesses[businessData.id].timestamp != -1) {
            productionEnded();
        }
        progress = 0;
        remainingTime = productionTime;
    }

    if (productionTime < 1 && store.businesses[businessData.id].managerHired) {
        progress = 100;
    }

    function productionEnded() {
        dispatch({ type: actionTypes.EndProduction, value: businessData.id });
        dispatch({ type: actionTypes.GoldUpdate, value: businessData.production[store.businesses[businessData.id].level] });

        if (store.businesses[businessData.id].managerHired) {
            dispatch({ type: actionTypes.StartProduction, value: businessData.id });
        }
    }

    const startProduction = () => {
        let isPurchased = store.businesses[businessData.id].level > 0;

        let isIdle = store.businesses[businessData.id].timestamp == -1;

        if (isIdle && isPurchased) {
            dispatch({ type: actionTypes.StartProduction, value: businessData.id });
        }
    };

    const FormatedTime = (timeData) => {
        const { time } = timeData;

        return Helpers.FormatedTime(time);
    };

    const FormatedGold = (goldData) => {
        const { gold } = goldData;
        return Helpers.FormatedGold(gold, 0);
    };


    const getClassName = () => {
        if (store.businesses[businessData.id].timestamp > 0)
            return "producing"
        if (store.businesses[businessData.id].level == 0)
            return "to-purchase"
        if (store.businesses[businessData.id].level > 0 && store.businesses[businessData.id].timestamp == -1)
            return "idle"
        return ""
    }

    return (
        <div onClick={startProduction} id="producer-panel" className={getClassName()}>
            <img id="icon" className={getClassName()} src={'./businessIcons/' + businessData.icon + '.png'} />

            {level > 0 &&
                <div id="progress-container">
                    <ProgressBar variant="success" animated now={progress} />
                    <div id="earning">
                        <img id="dollar-bar" src='./dollar.png' alt="$" />
                        <span><FormatedGold gold={businessData.production[level]} /></span>
                    </div>
                    <div id="timer">
                        <span>
                            <FormatedTime time={remainingTime} />
                        </span>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProducerPanel
