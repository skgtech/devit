module Jekyll
  class SpeekersGenerator < Generator
    def generate(site)
      site.data['speakers'].each do | year, data |
        data['speakers'].each do | speaker |
          site.pages << SpeakerPage.new(site, "speakers", year, speaker)
        end
      end
    end
  end

  class SpeakerPage < Page
    def initialize(site, type, year, speaker)
      @site = site
      @base = "/"
      @dir = type + "/" + year + "/" + speaker['url']
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, 'pages'), 'speakers/single.html')
      self.data['speaker'] = speaker
      self.data['year'] = year
      self.data['title'] = "#{ speaker['first_name'] } #{speaker['last_name']}"
      self.data['description'] = "#{ speaker['bio'].gsub(/<\/?[^>]*>/, "")[0, 150] } ..."
      self.data['image'] = "/assets/images/speakers/#{year}/#{ speaker['first_name'] }_#{ speaker['last_name'] }.png"
    end
  end

end
