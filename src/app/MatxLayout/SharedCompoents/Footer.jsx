import React from "react";
import { withStyles, MuiThemeProvider, Button } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const Footer = ({ theme, settings }) => {
    const footerTheme = settings.themes[settings.footer.theme] || theme;
    return (
        <MuiThemeProvider theme={footerTheme}>
            <Helmet>
                <style>
                    {`
              .footer {
                background: ${footerTheme.palette.primary.main};
                color: ${footerTheme.palette.primary.contrastText};
              }
            `}
                </style>
            </Helmet>
            <div className="footer flex flex-middle">
                <div className="flex flex-middle container px-sm-30 w-100">
                    <a href="https://ui-lib.com/downloads/matx-react-material-design-admin-template/" className="mr-8">
                        <Button variant="contained" color="error">

                        </Button>
                    </a>
                    <a href="https://ui-lib.com/downloads/matx-pro-react-material-design-admin-template/">
                        <Button variant="contained" color="secondary">

                        </Button>
                    </a>
                    <span className="m-auto"></span>
                    <p className="m-0">
                    </p>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

Footer.propTypes = {
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
    connect(
        mapStateToProps,
        {}
    )(Footer)
);