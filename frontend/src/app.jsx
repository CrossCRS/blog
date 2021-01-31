import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';

import PostPreview from './components/PostPreview';

function App() {
  const posts = [
    {
      _id: '0',
      title: 'A sample post title',
      author_id: {
        _id: '0',
        name: 'John Doe',
      },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat eget risus vitae varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et mauris sed tortor maximus sagittis. Cras pellentesque ultrices justo, nec euismod risus lacinia nec. Duis auctor at purus vel lacinia. Vestibulum pellentesque non enim nec faucibus. Sed tincidunt dolor ut diam pharetra, ac sodales justo accumsan. Sed diam lectus, vestibulum non auctor in, rhoncus quis leo. Sed lobortis vitae lorem eget fermentum. In mattis, nisl ut tincidunt mattis, enim ipsum condimentum quam, in faucibus tellus mi sed eros. Curabitur dapibus ornare ligula ac eleifend. Aliquam varius velit eu dapibus maximus. Morbi ex ante, semper mattis gravida non, elementum ac purus. Nullam molestie, lectus tempor mattis sollicitudin, velit felis semper lorem, vel consequat lorem mi a justo. Curabitur rhoncus consequat commodo. Nunc rutrum nec lacus at scelerisque. ',
      posted_at: '2021-01-28T13:58:57.197Z',
    },
    {
      _id: '1',
      title: 'Another sample post title',
      author_id: {
        _id: '0',
        name: 'John Doe',
      },
      content: 'Donec ultricies ornare aliquam. Suspendisse ornare est ex, vitae congue urna consectetur vitae. In maximus turpis congue bibendum blandit. In hac habitasse platea dictumst. Curabitur semper odio at tortor vulputate sagittis. Nam commodo ante lectus, et suscipit libero rhoncus eu. Donec a molestie quam. Praesent venenatis vitae est eu fermentum. Praesent rhoncus tempus aliquet. Donec tempor mi est, a commodo neque efficitur at. Duis suscipit sapien a risus placerat, id mollis dolor convallis. Aenean consectetur ligula in ipsum auctor interdum. Nam mollis, metus in dignissim varius, risus ligula vulputate lectus, sit amet tincidunt mauris justo non nisi. Suspendisse potenti. Phasellus vitae est varius, ornare nisl vitae, elementum metus. ',
      posted_at: '2021-01-26T13:45:57.197Z',
    },
    {
      _id: '2',
      title: 'A real interesting post title',
      author_id: {
        _id: '1',
        name: 'John Doe',
      },
      content: 'Sed rutrum, quam vitae sagittis gravida, tellus lectus sollicitudin urna, nec elementum urna ligula in purus. Aenean maximus at lorem id tincidunt. Fusce malesuada, tellus eget condimentum ornare, ante odio rhoncus nibh, a condimentum quam massa ac magna. Nunc finibus ac nulla in luctus. Nullam nisi risus, sodales id dolor vitae, consectetur tristique massa. Suspendisse pharetra massa ut felis porttitor, nec scelerisque dui viverra. Donec eget vehicula tellus. Sed lobortis mattis urna, ut ornare velit aliquet sit amet. Duis lacinia nunc ac rhoncus porta. Integer fringilla molestie fringilla. Aenean convallis tortor non leo accumsan elementum. Curabitur sed massa non orci cursus scelerisque id non ex. Nam nisl metus, elementum sit amet magna sit amet, porttitor sodales dolor. Nullam eleifend laoreet lobortis. Etiam ex nulla, dignissim in feugiat ut, mollis et diam. ',
      posted_at: '2021-01-25T13:32:57.197Z',
    },
    {
      _id: '3',
      title: 'Last post title',
      author_id: {
        _id: '0',
        name: 'John Doe',
      },
      content: 'Nullam arcu ipsum, fringilla et ante vel, vehicula molestie erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam eget ullamcorper odio. Nullam at aliquet lorem. Morbi sit amet nibh a mauris consequat semper. Praesent venenatis lobortis egestas. Quisque rhoncus ultricies enim, sit amet condimentum odio rhoncus vel. Integer ut leo vel massa condimentum condimentum et sit amet diam. Suspendisse arcu lorem, accumsan id ullamcorper eu, scelerisque nec magna. Nunc lectus lectus, vestibulum eget magna eget, porttitor interdum libero. ',
      posted_at: '2021-01-20T13:11:57.197Z',
    },
  ];

  return (
    <BrowserRouter>
      <Layout>
        {posts.map((post) => <PostPreview post={post} />)}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
