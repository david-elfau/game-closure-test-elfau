import React, { Component } from 'react'
import ListBussines from './Bussines'




class App extends Component {

    state = {        
        businesses: [
            {
                name: 'Lemon post.',
                production: [1, 2, 3, 4, 5, 6, 7, 8],
                timer: [5, 5, 5, 5, 5, 4.5, 4.5, 4.5],
                cost: [100, 3, 4, 5, 6, 7, 8, 9],
                icon: 'lemon',
                managerAsset: 'managerLemon',
                managerCost: 1000
            },
            {
                name: 'Newpaper delivery.',
                production: [3, 4, 5, 6, 7, 8,9,10],
                timer: [50, 50, 50, 50, 50, 45, 45, 45],
                cost: [150, 30, 40, 50, 60, 70, 80, 90],
                icon: 'newspaper',
                managerAsset: 'managerLemon',
                managerCost: 5000
            }
        ]
    };
    
    render() {
        const { businesses } = this.state;

        return (
            <div className="container">
                <ListBussines businessesData={businesses} />

            </div>
        )
    }
}

export default App