import ReactDOM from 'react-dom/client';

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>
};

const element = <Welcome name='Sara' />;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(element);
