import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <main className="error-page"><span className="eyebrow">Checkpoint Games</span><h1>Algo saiu do previsto.</h1><p>Recarregue a página para continuar navegando pela loja.</p><button className="primary-button" onClick={() => window.location.reload()}>Recarregar loja</button></main>;
    }
    return this.props.children;
  }
}
