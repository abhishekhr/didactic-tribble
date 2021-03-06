class SearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { preventHideDropdown: false, showDropdown: false, term: '', activities: [], categories: [], destinations: [] }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  search(term) {
    this.setState({ term });

    $.ajax({
      url: `/api/autocomplete.json/?term=${term}`,
      method: 'GET',
      success: (data) => { this.setState({
        activities: data.activities,
        categories: data.categories,
        destinations: data.destinations
      });}
    });
  }

  setPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  hideDropdown() {
    if (!this.state.preventHideDropdown) {
      this.setState({ showDropdown: true });
    }
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  render () {
    return (
      <div className="boxed-result">
        <SearchBar 
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term} 
          onSearchTermChange={(term) => {this.search(term)}}
        />
        {this.renderSearchResults()}
      </div>
    );
  }

  renderSearchResults() {
    if(!this.state.showDropdown || (this.state.activities.length === 0 && this.state.categories.length === 0 && this.state.destinations.length === 0)) {
      return;
    }

    return (
      <SearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        activities={this.state.activities}
        categories={this.state.categories}
        destinations={this.state.destinations}
      />
    );
  }
}
