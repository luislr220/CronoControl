import React from 'react'
import MenuLateral from '../MenuLateral/MenuLateral'
import "./TurnoCrud.css";
import Navigation from '../NavigationComponent/Navigation';

export default function Turno() {
  return (
    <div className="page-container">
        <Navigation />
        <div>Turno</div>
        <MenuLateral />
   </div> 
  )
}
