import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

function AllRides() {
    const rides = useSelector((state) => state.ride.rides)
    const [searchParams, setSearchParams] = useSearchParams()

    const [pickup, setPickup] = useState(searchParams.get('pickup') || '')
    const [destination, setDestination] = useState(searchParams.get('destination') || '')
    const [vehicleType, setVehicleType] = useState(searchParams.get('vehicle') || '')

    function handleSearch() {
        let params = {}
        if (pickup != '') params.pickup = pickup
        if (destination != '') params.destination = destination
        if (vehicleType != '') params.vehicle = vehicleType
        setSearchParams(params)
    }

    function handleClear() {
        setPickup('')
        setDestination('')
        setVehicleType('')
        setSearchParams({})
    }

    let filteredRides = rides.filter((ride) => {
        let matchPickup = true
        let matchDestination = true
        let matchVehicle = true

        let searchPickup = searchParams.get('pickup')
        let searchDestination = searchParams.get('destination')
        let searchVehicle = searchParams.get('vehicle')

        if (searchPickup && searchPickup != '') {
            matchPickup = ride.pickup.toLowerCase().includes(searchPickup.toLowerCase())
        }
        if (searchDestination && searchDestination != '') {
            matchDestination = ride.destination.toLowerCase().includes(searchDestination.toLowerCase())
        }
        if (searchVehicle && searchVehicle != '') {
            matchVehicle = ride.vehicleType.toLowerCase() == searchVehicle.toLowerCase()
        }

        return matchPickup && matchDestination && matchVehicle
    })

    return (
        <div>
            <div className="page-header">
                <h1>All Rides</h1>
                <p>Browse and search available rides</p>
            </div>

            <div className="container" style={{marginTop:'30px', marginBottom:'40px'}}>
                <div className="card" style={{marginBottom:'30px'}}>
                    <div className="card-header bg-dark" style={{color:'white'}}>
                        <h5>Search & Filter Rides</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">Pickup Location:</label>
                                <input type="text" className="form-control" placeholder="Search pickup..."
                                    value={pickup} onChange={(e) => setPickup(e.target.value)} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Destination:</label>
                                <input type="text" className="form-control" placeholder="Search destination..."
                                    value={destination} onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Vehicle Type:</label>
                                <select className="form-control" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Van">Van</option>
                                </select>
                            </div>
                            <div className="col-md-3" style={{display:'flex', alignItems:'end', gap:'10px'}}>
                                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                                <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredRides.length == 0 ? (
                        <div className="col-12">
                            <div className="alert alert-warning" style={{textAlign:'center'}}>
                                No rides found matching your search.
                            </div>
                        </div>
                    ) : (
                        filteredRides.map((ride) => (
                            <div className="col-sm-12 col-md-6 col-lg-4" key={ride.id} style={{marginTop:'20px'}}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{ride.pickup} &rarr; {ride.destination}</h5>
                                        <p><strong>Driver:</strong> {ride.driverName}</p>
                                        <p><strong>Time:</strong> {new Date(ride.departureTime).toLocaleString()}</p>
                                        <p><strong>Seats Available:</strong> {ride.availableSeats}</p>
                                        <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                                        <Link to={'/rides/' + ride.id} className="btn btn-primary btn-sm">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllRides
