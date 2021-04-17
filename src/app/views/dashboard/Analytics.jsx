import React, { Component, Fragment } from "react";
import {
    Grid,
    Card
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";

class Dashboard1 extends Component {
    state = {};

    render() {
        let { theme } = this.props;

        return (
            <Fragment>
                <div className="pb-86 pt-30 px-30 bg-primary">

                </div>

                <div className="analytics m-sm-30 mt--72">
                    <Grid container spacing={3}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>



                            <h4 className="card-title text-muted mb-16">Ongoing Projects</h4>


                        </Grid>

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Card className="px-24 py-16 mb-16">
                                <div className="card-title">Traffic Sources</div>
                                <div className="card-subtitle">Last 30 days</div>

                            </Card>

                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
