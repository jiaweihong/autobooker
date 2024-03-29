import React, { useEffect, useState } from "react";

const PastBookingTable = ({sortBookingsEarliestDate}) => {
    let [page, setPage] = useState(1);
    const entriesPerPage = 7;
    const [pastBookings, setPastBookings] = useState([])

    const getPastBookings = async () => {
        try {
            const res = await fetch(`/api/past_bookings`);
            const pastBookingsData = await res.json();

            sortBookingsEarliestDate(pastBookingsData);

            setPastBookings(pastBookingsData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPastBookings();
    }, [])

    const getLastEntryNumberBasedOnCurrentPage = () => {
        if (page * entriesPerPage < pastBookings.length){
            return page * entriesPerPage;
        } else {
            return pastBookings.length;
        }
    }


    return (
        <div className="container mt-2">
            <h3 className="text-center">Past bookings</h3>

            <table className="table">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">Username</th>
                        <th scope="col">Sport Centre</th>
                        <th scope="col">Activity</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col" style={{maxWidth: 200}}>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        pastBookings.map((booking, index) => {
                            if (index >= page * entriesPerPage - entriesPerPage && index < page * entriesPerPage) {
                                return (
                                    <tr key={booking.booking_id} className={booking.is_success ? "table-success" : "table-danger"}>
                                        <td>{booking.username}</td>
                                        <td>{booking.sports_centre}</td>
                                        <td>{booking.activity}</td>
                                        <td>{`${booking.activity_day < 10 ? "0"+booking.activity_day : booking.activity_day}/${booking.activity_month < 10 ? "0"+booking.activity_month : booking.activity_month}/${booking.activity_year}`}</td>
                                        <td>{`${booking.activity_hour}:00`}</td>
                                        <td style={{maxWidth: 200}}>
                                            {booking.is_success ? "Success" : `Failed. ${booking.result_message}`}
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            
            <div className="row">
                <div className="col text-muted">Showing {page * entriesPerPage - (entriesPerPage-1)} to {getLastEntryNumberBasedOnCurrentPage()} of {pastBookings.length} bookings</div>

                <div className="col">
                    <ul className="pagination">
                        <li className="page-item ms-auto">
                            <a className="page-link" onClick={() => {page >= 2 ? setPage(--page) : console.log(page)}}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => {page <= Math.ceil(pastBookings.length/entriesPerPage) - 1 ? setPage(++page) : console.log(page)}}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </div>  
            </div>
        </div>
    )
}

export default PastBookingTable;