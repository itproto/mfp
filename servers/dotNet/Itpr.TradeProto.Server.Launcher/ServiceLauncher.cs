using System;
using System.Collections.Generic;
using System.Reactive.Disposables;
using System.Threading.Tasks;

namespace Itpr.TradeProto.Server.Launcher
{
    public class ServiceLauncher : IServiceLauncher
    {
        private readonly Dictionary<string, IDisposable> _services = new Dictionary<string, IDisposable>();

        // private readonly Dictionary<ServiceType, Lazy<IServiceHostFactory>> _factories =
        //   new Dictionary<ServiceType, Lazy<IServiceHostFactory>>();

        public ServiceLauncher()
        {
            InitializeFactories();
        }

        private void InitializeFactories()
        {
            //   _factories.Add(ServiceType.Reference,
            //       new Lazy<IServiceHostFactory>(() => new ReferenceDataReadServiceHostFactory()));
        }


        public string StartService(ServiceType type)
        {
            var name = GenerateName(type);

            /*
                var factory = _factories[type].Value;

                var a = App.Create(new string[] { }, factory);
                _services.Add(name, Disposable.Create(() => a.Kill()));
                Task.Run(() => a.Start());*/

            return name;
        }

        private string GenerateName(ServiceType type)
        {
            var counter = 0;
            string proposedName;

            do
            {
                counter++;
                proposedName = type.ToString().Substring(0, 1).ToLower() + counter;
            } while (_services.ContainsKey(proposedName));

            return proposedName;
        }

        public bool KillService(string serviceName)
        {
            if (!_services.ContainsKey(serviceName)) return false;

            var server = _services[serviceName];
            _services.Remove(serviceName);
            server.Dispose();
            return true;
        }

        public IEnumerable<string> GetRunningServices()
        {
            return _services.Keys;
        }

        public void InitializeEventStore(IEventStoreConfiguration configuration)
        {
            var eventStoreConnection = EventStoreConnectionFactory.Create(EventStoreLocation.External, configuration);

            eventStoreConnection.ConnectAsync().Wait();

            ReferenceDataHelper.PopulateRefData(eventStoreConnection).Wait();
        }
    }
}