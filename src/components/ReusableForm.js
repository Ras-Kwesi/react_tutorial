// We import useContext and ThemeContext
import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import PropTypes from "prop-types";

function ReusableForm(props) {
    // We create a ThemeContext consumer and 
    // get access to the provider value.
    const theme = useContext(ThemeContext);

    // We create button styles.
    const buttonStyles = {
        backgroundColor: theme.buttonBackground,
        color: theme.textColor,
    }

    // We create input styles.
    const inputStyles = {
        backgroundColor: theme.inputBackground,
        color: theme.textColor,
    }

    if (!theme) {
        throw new Error("ThemeContext must be used within a ThemeContext.Provider!");
    }

    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
                <label>Pair Names:
                    <br />
                    {/* We add input styles. */}
                    <input
                        style={inputStyles}
                        type='text'
                        name='names' />
                </label>
                <br />
                <label>Location:
                    <br />
                    {/* We add input styles. */}
                    <input
                        style={inputStyles}
                        type='text'
                        name='location' />
                </label>
                <br />
                <label>Describe your issue:
                    <br />
                    {/* We add input styles. */}
                    <textarea
                        style={inputStyles}
                        name='issue' />
                </label>
                <br />
                {/* We add button styles. */}
                <button style={buttonStyles} type='submit'>{props.buttonText}</button>
            </form>
            <hr />
        </React.Fragment>
    );
}

ReusableForm.propTypes = {
    formSubmissionHandler: PropTypes.func,
    buttonText: PropTypes.string
};

export default ReusableForm;