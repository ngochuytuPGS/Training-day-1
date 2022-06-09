import React, { HTMLInputTypeAttribute } from 'react'
import { ErrorMessage, Field } from 'formik'
import { FormattedMessage } from 'react-intl'

type displayType = 'column' | 'row';

type labelPositionType = 'left' | 'right';

interface Props {
    fieldType: HTMLInputTypeAttribute;
    fieldName: string;
    fieldClassName?: string;
}

interface DisplayRowProps extends Props {
    display: "row";
    labelPosition: labelPositionType;
}

interface DisplayColumnProps extends Props {
    display: "column";
}

const getLabelPositionClassName = (display: displayType, labelPosition: labelPositionType): string => {
    if (display === "row") {
        if (labelPosition === "left") {
            return "order-0";
        }
        else {
            return "order-1";
        }
    }

    return '';
}

const FormikField = (props: (DisplayRowProps | DisplayColumnProps)) => {
    const { display, fieldType, fieldName, fieldClassName } = props;
    const { labelPosition } = props as DisplayRowProps;

    return (
        <div className="col-md-12">
            <div className={`d-flex ${display === "column" && "flex-column"}`}>
                <label htmlFor={fieldName} className={`form-label ${getLabelPositionClassName(display, labelPosition)}`}>
                    <FormattedMessage id={fieldName} />
                </label>

                <Field type={fieldType} id={fieldName} name={fieldName} className={fieldClassName} />
            </div>

            <small className="text-danger">
                <ErrorMessage name={fieldName}>
                    {
                        errorMessage => <FormattedMessage id={errorMessage} />
                    }
                </ErrorMessage>
            </small>
        </div>
    )
}

export default FormikField;