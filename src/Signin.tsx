import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'yup'... Remove this comment to see the full error message
import * as Yup from 'yup';
import firebase from './Common/firebase';
type State = any;
class SignInOrUp extends React.Component<{}, State> {
    state = {
        loading: false,
    };
    _isMounted = false;
    handleOnSubmit = (values: any) => {
        //spinner表示開始
        if (this._isMounted)
            this.setState({ loading: true });
        //サインイン（ログイン）処理
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
            //正常終了時
            (this.props as any).history.push("/");
            if (this._isMounted)
                this.setState({ loading: false });
        })
            .catch(error => {
            //異常終了時
            if (this._isMounted)
                this.setState({ loading: false });
            alert(error);
        });
    };
    componentDidMount = () => {
        this._isMounted = true;
    };
    componentWillUnmount = () => {
        this._isMounted = false;
    };
    render() {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className="container" style={{ color: 'black' }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p style={{ textAlign: 'center' }}>サインイン</p>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => this.handleOnSubmit(values)} validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (<Form onSubmit={handleSubmit}>
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <FormGroup>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Label for="email">Email</Label>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Input type="email" name="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} invalid={touched.email && errors.email ? true : false}/>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <FormGroup>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Label for="password">Password</Label>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Input type="password" name="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} invalid={touched.password && errors.password ? true : false}/>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <FormFeedback>
                                            {errors.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <div style={{ textAlign: 'center' }}>
                                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Button color="primary" type="submit" disabled={this.state.loading}>
                                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading}/>
                                            ログイン
                                        </Button>
                                    </div>
                                </Form>)}
                    </Formik>
                </div>
            </div>);
    }
}
export default withRouter(SignInOrUp);
