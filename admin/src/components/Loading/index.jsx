import classNames from 'classnames';
import './Loading.scss';

function Loading({ show = true }) {
    return (
        <div
            id="Loading"
            className={classNames('select-none Loading flex justify-center items-center duration-300')}
            style={{ display: 'none' }}
        >
            <div className="wrapper">
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
}

export default Loading;
