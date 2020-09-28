import React, {Component, Fragment} from 'react';
import {FormWizard} from 'react-material-formik-wizard';
import AboutSectionStep from './AboutSectionStep';
import BasicDetailsStep from './BasicDetailsStep';
import ReviewStep from './ReviewStep';
import {signUpUser} from '../../../actions/userAction';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import {CircularProgress,} from '@material-ui/core';
class AddProfileContent extends Component {


  render()
  {
    const steps = [
      {
        component: BasicDetailsStep,
        title: 'Basic details',
      },
      {
        component: AboutSectionStep,
        title: 'About',
      },
      {
        component: ReviewStep,
        title: 'Review',
      },
    ];

    const doSubmit = (values) => {
      this.props.dispatch(signUpUser({user: values}));
    };
    const {error, isAuthenticating} = this.props.user;

    let content;

    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (isAuthenticating) {
      content = (
          <CircularProgress>
            <span>Loading...</span>
          </CircularProgress>
      );
    }
    return (
        <React.Fragment>
          <main>
            <FormWizard
                displayProgress={true}
                formComponents={steps}
                doSubmit={doSubmit}
                successTitle={'Success'}
                successTitleComponent={'h1'}
                successMessage={'Your user profile has been successfully made!'}
                successMessageComponent={'h5'}
            />
          </main>
        </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AddProfileContent);
