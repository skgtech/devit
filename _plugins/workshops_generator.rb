module Jekyll
  class WorkshopsGenerator < Generator
    def generate(site)
      site.data['workshops'].each do | year, data |
        data['allDay'].each do | workshop |
          site.pages << WorkshopPage.new(site, "workshops-all-day", year, workshop)
        end
        data['open'].each do | workshop |
          site.pages << WorkshopPage.new(site, "workshops-open", year, workshop)
        end
      end
    end
  end

  class WorkshopPage < Page
    def initialize(site, type, year, workshop)
      if !workshop['url']
        return
      end
      @site = site
      @base = "/"
      @dir = type + "/" + year + "/" + workshop['url']
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, '_includes'), 'workshop.single-page.html')

      @speaker = site.data['speakers']['2017']['speakers'].find {|s| s['url'] == workshop['speaker'] }

      self.data['workshop'] = workshop
      self.data['year'] = year
      self.data['title'] = "#{ workshop['title'] } - DEVit"
      self.data['ogTitle'] = "#{ workshop['title'] } - DEVit"
      self.data['ogDescription'] = "#{ workshop['description'].gsub(/<\/?[^>]*>/, "")[0, 150] } ..."

      unless @speaker.nil?
        self.data['ogImage'] = "/assets/images/speakers/2017/#{ @speaker['first_name'] }_#{ @speaker['last_name'] }.png"
      end
    end
  end

end
