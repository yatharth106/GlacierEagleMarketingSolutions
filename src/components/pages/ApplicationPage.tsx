import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    arrRange: '',
    revenueChallenge: '',
    emailPlatform: '',
    crm: '',
    leadVolume: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for test mode in URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testMode = params.get('testMode') === 'true';
    setIsTestMode(testMode);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-ivory">
        <Header />
        <section className="w-full bg-ivory pt-32 pb-32">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-2xl mx-auto text-center"
            >
              {isTestMode && (
                <div className="mb-8 p-4 bg-emerald-forest/10 border border-emerald-forest rounded-lg">
                  <Badge className="bg-emerald-forest text-ivory mb-3">Test Mode</Badge>
                  <p className="text-sm font-paragraph text-charcoal">
                    This is a test submission. No live business process was triggered.
                  </p>
                </div>
              )}
              <h1 className="text-5xl font-heading text-charcoal mb-8">
                Application Received
              </h1>
              <p className="text-lg font-paragraph text-charcoal mb-8">
                Thank you for your interest in Glacier Eagle. We review all applications carefully and will respond within 3-5 business days.
              </p>
              <p className="text-base font-paragraph text-charcoal opacity-70">
                Limited engagements accepted quarterly.
              </p>
              {isTestMode && (
                <div className="mt-12 pt-8 border-t border-charcoal/20">
                  <p className="text-sm font-paragraph text-charcoal opacity-70 mb-4">
                    Submitted Data (Test Mode):
                  </p>
                  <div className="bg-charcoal/5 p-6 rounded-lg text-left space-y-2">
                    <p className="text-sm font-paragraph"><span className="font-semibold">Company:</span> {formData.companyName}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">ARR Range:</span> {formData.arrRange}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">Email Platform:</span> {formData.emailPlatform}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">CRM:</span> {formData.crm}</p>
                    <p className="text-sm font-paragraph"><span className="font-semibold">Lead Volume:</span> {formData.leadVolume}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <section className="w-full bg-ivory pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <h1 className="text-5xl md:text-6xl font-heading text-charcoal text-center">
                Request a Private Revenue Audit
              </h1>
              {isTestMode && <Badge className="bg-emerald-forest text-ivory">Test Mode</Badge>}
            </div>
            <p className="text-lg font-paragraph text-charcoal mb-12 text-center">
              Complete this application to be considered for engagement. We review all submissions and respond within 3-5 business days.
            </p>

            {isTestMode && (
              <div className="mb-8 p-4 bg-emerald-forest/10 border border-emerald-forest rounded-lg">
                <p className="text-sm font-paragraph text-charcoal">
                  <span className="font-semibold">🧪 Test Mode Active:</span> Submitting this form will simulate a successful submission without triggering any live business processes.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-stone p-12">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-base font-paragraph text-charcoal font-semibold">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-ivory border-charcoal text-charcoal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="arrRange" className="text-base font-paragraph text-charcoal font-semibold">
                  Annual Recurring Revenue Range *
                </Label>
                <Select
                  required
                  value={formData.arrRange}
                  onValueChange={(value) => setFormData({ ...formData, arrRange: value })}
                >
                  <SelectTrigger className="bg-ivory border-charcoal text-charcoal">
                    <SelectValue placeholder="Select ARR range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500k">Under $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="10m-plus">$10M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="revenueChallenge" className="text-base font-paragraph text-charcoal font-semibold">
                  Primary Revenue Challenge *
                </Label>
                <Textarea
                  id="revenueChallenge"
                  required
                  rows={4}
                  value={formData.revenueChallenge}
                  onChange={(e) => setFormData({ ...formData, revenueChallenge: e.target.value })}
                  placeholder="Describe your primary revenue challenge or opportunity"
                  className="bg-ivory border-charcoal text-charcoal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="emailPlatform" className="text-base font-paragraph text-charcoal font-semibold">
                  Current Email Platform *
                </Label>
                <Input
                  id="emailPlatform"
                  required
                  value={formData.emailPlatform}
                  onChange={(e) => setFormData({ ...formData, emailPlatform: e.target.value })}
                  placeholder="e.g., HubSpot, Mailchimp, ActiveCampaign"
                  className="bg-ivory border-charcoal text-charcoal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="crm" className="text-base font-paragraph text-charcoal font-semibold">
                  CRM Used *
                </Label>
                <Input
                  id="crm"
                  required
                  value={formData.crm}
                  onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                  placeholder="e.g., Salesforce, HubSpot, Pipedrive"
                  className="bg-ivory border-charcoal text-charcoal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="leadVolume" className="text-base font-paragraph text-charcoal font-semibold">
                  Monthly Trial / Lead Volume *
                </Label>
                <Select
                  required
                  value={formData.leadVolume}
                  onValueChange={(value) => setFormData({ ...formData, leadVolume: value })}
                >
                  <SelectTrigger className="bg-ivory border-charcoal text-charcoal">
                    <SelectValue placeholder="Select monthly volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50">Under 50</SelectItem>
                    <SelectItem value="50-100">50 - 100</SelectItem>
                    <SelectItem value="100-250">100 - 250</SelectItem>
                    <SelectItem value="250-500">250 - 500</SelectItem>
                    <SelectItem value="500-plus">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </Button>
                <p className="text-sm font-paragraph text-charcoal opacity-70 text-center mt-4">
                  Limited engagements accepted quarterly.
                </p>
                {isTestMode && (
                  <p className="text-xs font-paragraph text-emerald-forest text-center mt-3">
                    ✓ Test mode enabled - safe to submit
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
