import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../../../models/auth';
import { validateLogin, validLogin } from '../../../utils';
import FormikField from '../FormikField/FormikField';
import styles from "./loginForm.module.scss"

interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}

const LoginForm = ({ onLogin, loading, errorMessage }: Props) => {
    const formValues: ILoginParams = { email: '', password: '', rememberMe: false };

    const validate = React.useCallback((values: ILoginParams): ({} | ILoginValidation) => {
        const validation = validateLogin(values);

        if (validation.email === "" && validation.password === "") {
            return {};
        }
        else {
            return validation
        }
    }, [])

    return (
        <Formik
            initialValues={formValues}
            onSubmit={values => onLogin(values)}
            validate={values => validate(values)}
        >
            <Form className={`row g-3 needs-validation ${styles["login__form"]}`}>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <FormikField display="column" fieldName='email' fieldType="text" fieldClassName='form-control' />
                <FormikField display="column" fieldName='password' fieldType="text" fieldClassName='form-control' />
                <FormikField display="row" labelPosition="right" fieldName='rememberMe' fieldType="checkbox" fieldClassName='form-check-input me-2' />


                <div className="row justify-content-md-center my-3">
                    <div className="col-md-auto">
                        <button
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading && <div className="spinner-border spinner-border-sm text-light me-2" role="status" />}
                            <FormattedMessage id="register" />
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginForm;
