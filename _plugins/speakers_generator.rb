module Jekyll
  class SpeekersGenerator < Generator
    def generate(site)
      site.data['speakers'].each do | year, data |
        data['speakers'].each do | speaker |
          site.pages << SpeakerPage.new(site, "speakers", year, speaker)
        end
        data['mc'].each do | mc |
          site.pages << SpeakerPage.new(site, "mc", year, mc)
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
      self.read_yaml(File.join(@base, '_layouts'), 'speaker.html')
      self.data['speaker'] = speaker
      self.data['year'] = year
    end
  end

end
