import React, { useState, useEffect } from "react";
import {
    Form,
    Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { faqQuestion, faqAnswer } from './faqValidation';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    title: {
        padding: '36px 0 32px 36px',
        fontSize: '36px',
        textTransform: "capitalize",
        marginBottom: '0px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            fontSize: 30,
            padding: '12px 0 12px 12px',
            textAlign: 'center',
        },
    },
    link: {
        textTransform: "uppercase",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#000000",
        padding: "0 18px",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            margin: "20px 0",
            textAlign: "center",
            background: "#FFFFFF",
            height: "50px",
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
            borderRadius: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    right: {
        [theme.breakpoints.down("md")]: {
            marginTop: 30,
        },
    },
    dropimg: {
        width: 50,
        borderRadius: "50%",
    },

    otheuperrow: {
        marginTop: "40px",
    },
    active: {
        background: "#000",

    },
    active1: {
        color: "#fff !important",
    },
    sidelink: {
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "21px",
        textTransform: "capitalize",
        color: "#000",
    },
    input: {
        color: '#000',
        fontSize: 12,
        textTransform: "capitalize",
        fontWeight: 500,
        height: '50px',
        '&::placeholder': {
            textTransform: "capitalize",
        },
    },
    btnactive: {
        background: '#000',
        color: '#fff',
        border: '1px solid #000',
        borderRadius: '16px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        textTransform: "capitalize",
        width: 120,
        '&:hover': {
            background: "#fff",
            color: '#000',
            border: '1px solid #000',
        },

    },
    btnreset: {
        background: '#fff',
        color: '#000',
        width: '100%',
        padding: '10px',
        height: '60px',
        margin: '0 10%',
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        textTransform: "capitalize",
        '&:hover': {
            background: "#fff",
            color: '#000',
            border: 'none',
        },
        [theme.breakpoints.down("md")]: {
            width: '80%',
            margin: '10px 0'
        },
    },
    btnsubmit: {
        background: '#000',
        color: '#fff',
        width: '100%',
        padding: '10px',
        height: '60px',
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        textTransform: "capitalize",
        '&:hover': {
            background: "#fff",
            color: '#000',
            border: 'none',
        },
        [theme.breakpoints.down("md")]: {
            width: '80%',
            margin: '10px 0'
        }
    },
    btngroup: {
        [theme.breakpoints.down("md")]: {
            textAlign: 'center'
        }
    },
    formgroup: {
        [theme.breakpoints.down("xs")]: {
            marginTop: '1rem'
        }
    }
}));


const UpdateFAQInput = ({ handelUpdateNotesSubmit, faqId }) => {
    const classes = useStyles();

    const [faq, setFAQ] = useState({question:"" , answer:""})
    const [formErrForUpdate, setFormErrsForUpdate] = useState({ errorForFAQQuestion: "", errorForFAQAnswer: "" });
    const [buttonDisabled, setbuttonDisabled] = useState(true);


    useEffect(() => {
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getFAQ/" + faqId).then(res => {
            setFAQ(res.data.data[0]);
        }).catch(err => console.log("Err is", err))
    }, [])


    function handleChange(e) {
        e.preventDefault();
        setbuttonDisabled(false);
        const { id, value } = e.target;

        switch (id) {
            case 'FAQQuestion':
                if (faqAnswer(value)) {
                    setFormErrsForUpdate({ ...formErrForUpdate, errorForFAQQuestion: "*Notes Title is required" })
                }
                else {
                    delete formErrForUpdate.errorForFAQQuestion
                }
                setFAQ({ ...faq, question: value })
                break;
            case 'FAQAnswer':
                if (faqAnswer(value)) {
                    setFormErrsForUpdate({ ...formErrForUpdate, errorForFAQAnswer: "*Notes Description is required" })
                }
                else {
                    delete formErrForUpdate.errorForFAQAnswer
                }
                setFAQ({ ...faq, answer: value })
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="FAQQuestion">
                <Form.Label>Question </Form.Label>
                <Form.Control type="select" className={classes.input} value={faq.question || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
                <small style={{ color: "red" }}>{formErrForUpdate.errorForFAQQuestion}</small>
            </Form.Group>

            <Form.Group className="mb-3" rows={3} controlId="FAQAnswer">
                <Form.Label>Answer  </Form.Label>
                <Form.Control type="text" rows={3} className={classes.input}  value={faq.answer || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
                <small style={{ color: "red" }}>{formErrForUpdate.errorForFAQAnswer}</small>
            </Form.Group>


            <Form.Group className="mb-3" style={{ textAlign: "center" }} controlId="submit">
                <Button type="submit" onClick={() => handelUpdateNotesSubmit(faq)} disabled={buttonDisabled} >Update</Button>
            </Form.Group>

        </div>
    );
}

export default UpdateFAQInput;
