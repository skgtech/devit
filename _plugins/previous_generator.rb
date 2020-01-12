module Jekyll
  class PreviousGenerator < Generator
    def generate(site)
      site.data['previous'].reverse_each do | year, data |
        site.pages << PreviousPage.new(site, "previous", year, data)
      end
    end
  end

  class PreviousPage < Page
    def initialize(site, type, year, data)
      @site = site
      @base = "/"
      @dir = year
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'previous.html')
      self.data['layout'] = 'default'
      self.data['custom_js'] = ['previous-landing.bundle.js']
      self.data['album'] = data['album']
      self.data['year'] = year
      self.data['title'] = "DEVit #{ year }"
    end
  end

  class SpeakerRedirectPage < Page
    def initialize(site, type, year, speaker)
      @site = site
      @base = "/"
      @dir = type + "/" + year + "/" + speaker['url']
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'redirect.html')
      self.data['destination_path'] = @site.config['url'] + "/" + type + "/" + speaker['url']
    end
  end

end
