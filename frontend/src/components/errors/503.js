/* eslint-disable react/prop-types */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Image503 from '../../assets/svgs/503.svg';

export class ServiceUnavailableBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location?.pathname !== this.props.location?.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    const html = (
      <div className='w-full h-screen bg-white p-8 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center text-center px-5'>
          <img
            src={Image503}
            alt='Service Unavailable Boundary'
            className='max-w-full h-auto mb-8'
          />
          <div className='text-gunmetal text-heading_3 font-bold mb-1'>
            Sorry, this service was unavailable
          </div>
          <div className='text-gunmetal-60 text-body_1 mb-4'>
            Comeback later or contact our administrator.
          </div>
          <Link
            to='/'
            className='bg-main-yale_blue px-8 py-3 inline-block items-center rounded-lg text-secondary-white hover:bg-main-yale_blue-60'
          >
            Go Back
          </Link>
        </div>
      </div>
    );

    return hasError ? html : children;
  }
}
