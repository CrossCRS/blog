// Util component used to scroll to top on page change
// https://stackoverflow.com/a/54343182
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (null);
}

export default withRouter(ScrollToTop);
