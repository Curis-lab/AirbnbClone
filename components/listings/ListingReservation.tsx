"use client";

import React from 'react'

interface ListingReservationProps{
    price: number,
    dateRange: Range,
    totalPrice: number,
    onChangeDate:(value: Range) => void,
    onSubmit:()=>void,
    disabled?: boolean,
    disabledDates: Date[]
}

function ListingReservation({price, dateRange, totalPrice,onChangeDate,onSubmit, disabled,disabledDates}: ListingReservationProps) {
  
    return (
    <div>
      hello
    </div>
  )
}

export default ListingReservation
