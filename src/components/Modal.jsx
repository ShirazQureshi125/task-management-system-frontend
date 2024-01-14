import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
const SimpleModal = ({ open, onClose, value }) => {
  return (
    <Modal show={open} onHide={onClose} dialogClassName="custom-modal" centered style={{marginTop:'2rem'}}>
      <div className="modal-content">
        <Modal.Header closeButton style={{ display: 'flex'}}>
          <Modal.Title style={{ fontSize: '24px' , flex:'1'}}>Task Details</Modal.Title>
          
            
          
        </Modal.Header>
        <Modal.Body className="task-modal">
          {/* Customize the content of your modal here */}
          <h2 style={{ color: '#546FFF', lineHeight: '150%', letterSpacing: '-0.48px' }}>{value.Name}</h2>
          <div className="modal-p" style={{ display: 'flex' }}>
            <p style={{ marginLeft: '2rem' }}>
              {' '}
              <span>Due Date:<br></br></span> {value.dueDate}
            </p>
            <p style={{ marginLeft: '8rem' }}>
              <span>Assignee:<br></br></span>  {value.assignee ? value.assignee.username : "N/A"}
            </p>
            <p style={{ marginLeft: '8rem' }}>
              <span>Priority:<br></br></span> {value.priority}
            </p>
            <p style={{ marginLeft: '8rem' }}>
              <span> Status: <br></br></span> {value.status}
            </p>
            <p style={{ marginLeft: '8rem' }}>
              <span> Assigned By: <br></br></span> {value.assignee.username }
            </p>
          </div>
          <div
            className="modal-discription"
            style={{
              border: '2px solid rgba(101, 111, 125, 0.2)',
              width: '922px',
              height: '244px',
              borderRadius: '10px',
              marginLeft: '1rem',
            }}
          >
            <div className="disc_content">
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginTop: '1rem',
                  margin: '1rem',
                }}
              >
               <span style={{fontWeight:'600', fontSize:'15px', color:'#3b71ca '}} >{value.description}</span>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                praesentium rem iste, nam fuga vel nemo minus voluptate
                repellendus vitae, quis voluptatibus nobis voluptatem tempore
                itaque non! Corrupti, nulla optio. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ipsa voluptates totam dolore
                aspernatur nemo? Temporibus odit, vero deleniti sit corporis
                quisquam voluptatum! Laborum aliquam odit nihil repellat esse
                quidem suscipit! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Fuga consequatur veritatis magnam possimus
                blanditiis fugiat voluptatem. Sequi mollitia, reiciendis fuga
                accusantium, iure cumque velit, aliquam quaerat nobis voluptate
                dolorum error?
              </p>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SimpleModal;
